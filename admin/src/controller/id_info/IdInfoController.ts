import {Response} from "express";
import { Body, Controller, Get, Param, Post, Query, Res, Session } from '@nestjs/common';
import { WinstonLogger } from '@src/logger/WinstonLogger';
import { IdInfoService } from "@src/service/IdInfoService";
import { Pager } from "@src/model/dto/Pager";
import { ParseIntPipe } from "@src/middleware/pipe/ParseIntPipe";
import { UtilService } from "@src/service/UtilService";
import { toCompletedIdApprovalUiModel, toRequestIdApprovalUiModel } from "@src/controller/id_info/response/IdApprovalResponse";
import { ApiResponse } from "@src/model/global/ApiResponse";
import { LoginNeededException } from "@src/exception/LoginNeededException";
import { UpdateIdInfoRequest } from "./request/IdInfoRequest";

@Controller('id_approval')
export class IdApprovalController {
    constructor (
        private readonly idInfoService: IdInfoService,
        private readonly utilService: UtilService,
        private readonly logger: WinstonLogger
    ) {
        this.logger.setContext('IdApprovalController');
    }

    @Get()
    async idApproval(
        @Session() session: Record<string, any>,
        @Res() res: Response,
        @Query('request-page', new ParseIntPipe('invalid request page query parameter', {defaultValue: 1})) requestPage: number,
        @Query('request-limit', new ParseIntPipe('invalid request limit query parameter', {defaultValue: 10, maxValue: 100})) requestLimit: number,

        @Query('completed-page', new ParseIntPipe('invalid request page query parameter', {defaultValue: 1})) completedPage: number,
        @Query('completed-limit', new ParseIntPipe('invalid request limit query parameter', {defaultValue: 10, maxValue: 100})) completedLimit: number,
        
        @Query('is-completed') isCompleted: boolean | undefined,
    ): Promise<any> {
        if (!session.adminId || !session.otpVerified) {
            return res.redirect(`/signin`) as any;
        }

        if (isCompleted == undefined) {
            isCompleted = false;
        }

        //request list
        const requestPager: Pager = new Pager();
        requestPager.setOffSet(requestPage);
        requestPager.currentPage = requestPage;

        requestPager.setLastPage(await this.idInfoService.getUnApprovalIdListCount()
            .then((result) => {
                return result;
            })
        );
        requestPager.setPager(requestPager.lastPage, requestPage);

        const requestIdApprovalList = await this.idInfoService.getUnApprovalIdList(requestLimit, requestPager.offSet);
        const requestIdApprovalUiModel = toRequestIdApprovalUiModel(requestIdApprovalList, requestLimit, requestPager.offSet);

        //completed list
        const completedPager: Pager = new Pager();
        completedPager.setOffSet(completedPage);
        completedPager.currentPage = completedPage;

        completedPager.setLastPage(await this.idInfoService.getCompletedApprovalIdListCount()
            .then((result) => {
                return result;
            })
        );
        completedPager.setPager(completedPager.lastPage, completedPage);

        const completedIdApprovalList = await this.idInfoService.getCompletedApprovalIdList(completedLimit, completedPager.offSet);
        const completedIdApprovalUiModel = toCompletedIdApprovalUiModel(completedIdApprovalList, completedLimit, completedPager.offSet);

        return res.render('id_approval', {
            adminName: session.adminName, adminEmail: session.adminEmail,
            requestIdApproval: requestIdApprovalUiModel,
            requestPager: requestPager,

            completedIdApproval: completedIdApprovalUiModel,
            completedPager: completedPager,

            isCompleted
        });
    }

    @Get('detail/:seq')
    async getPictures(
        @Session() session: Record<string, any>,
        @Res() res: Response,
        @Param('seq') seq: string,
    ): Promise<any> {
        if (!session.adminId || !session.otpVerified) {
            return res.redirect(`/signin`) as any;
        }

        const idInfo = await this.idInfoService.getIdInfo(seq);
        let pictureUrl = "";
        if (idInfo?.picture) {
            pictureUrl = await this.utilService.getS3SignedUrl(idInfo.picture).then((result) => {return result});
            console.log(pictureUrl)
        }
        console.log('{"success": true, "picture": "' + pictureUrl + '"}');
        return res.end('{"success": true, "picture": "' + pictureUrl + '"}');
    }

    @Post('/process')
    async idcardProcess(
        @Session() session: Record<string, any>,
        @Body() body: UpdateIdInfoRequest,
    ): Promise<ApiResponse<null>> {
        if (!session.adminId || !session.otpVerified) {
            throw new LoginNeededException('로그인을 다시 해주세요');
        }

        await this.idInfoService.updateIdInfo(body);   
        return new ApiResponse('0', 'success', null);
    }
}
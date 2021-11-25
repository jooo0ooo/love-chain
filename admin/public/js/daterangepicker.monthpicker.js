var datePickers = function(s, e, classDom, idDom, sformat = 'YYYY-MM-DD', showCalendars = true, ranges, scrl = true,monthRange) {
    if (!ranges) {
        ranges = {
            'Today': [moment(), moment()],
            'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
            'Last 7 Days': [moment().subtract(6, 'days'), moment()],
            'Last 30 Days': [moment().subtract(29, 'days'), moment()],
            'This Month': [moment().startOf('month'), moment().endOf('month')],
            'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
        }
    }
    var start = s || moment();
    var end = e || moment();
 
    function cb(start, end) {
        classDom.html(start.format(sformat) + " - " + end.format(sformat));
    }
    idDom.daterangepicker({
            locale: {
                format: sformat
            },
            alwaysShowCalendars: showCalendars,
            showDropdowns: true,
            startDate: start,
            showCustomRangeLabel: scrl,
            endDate: end,
            opens: "right",
            ranges: ranges
        },
        cb
    );
    cb(start, end);
    if(monthRange){
                 //Modify the date picker
        $('div.drp-calendar').empty().html('<div class="s-cal"><div class="s-calTitle"><span class="glyphicon glyphicon-arrow-left s-calLastYear"aria-hidden="true"></span><p>2018</p><span class="glyphicon glyphicon-arrow-right s-calNextYear"aria-hidden="true"></span></div><ul class="s-calMonth"><li data-month="01">Jan</li><li data-month="02">Feb</li><li data-month="03">Mar</li><li data-month="04">Apr</li></ul><ul class="s-calMonth"><li data-month="05">May</li><li data-month="06">Jun</li><li data-month="07">Jul</li><li data-month="08">Aug</li></ul><ul class="s-calMonth"><li data-month="09">Sep</li><li data-month="10">Oct</li><li data-month="11">Nov</li><li data-month="12">Dec</li></ul></div>');
        $('div.drp-calendar.left > .s-cal').before('<div class="s-calViewTitle">Start Date</div>');
        $('div.drp-calendar.right > .s-cal').before('<div class="s-calViewTitle">End Date</div>');
        var timePickerDom = $('.s-timePicker'),
            sYearView = $($('.s-calTitle > p')[0]),
            eYearView = $($('.s-calTitle > p')[1]),
            monthViewLis = $('.s-calMonth > li'),
            sMonthViewLis = $($('.s-cal')[0]).find('.s-calMonth > li'),
            eMonthViewLis = $($('.s-cal')[1]).find('.s-calMonth > li'),
            tabs = $('div.daterangepicker > div.ranges > ul > li'),
            lastTab = $('div.daterangepicker > div.ranges > ul > li:last-child');
                 //Cache date
        var tempSYear,
            tempEyear,
            tempSMonth,
            tempEMonth;
                 //Change the calendar view modification style
        function changeView(isAngle = false){
            var currentSYear = sYearView.text();
            var currentEYear = eYearView.text();
            eMonthViewLis.removeClass('disabled');
            if(isAngle){
                                 //The year is inconsistent
                if(currentSYear > currentEYear){
                    eMonthViewLis.addClass('disabled');
                }
                if(currentSYear < currentEYear){
                    eMonthViewLis.removeClass('disabled');
                }
                if(currentSYear == tempSYear){
                    sMonthViewLis.eq(tempSMonth).addClass('onFocus');
                }
                if(currentEYear == tempEyear){
                    eMonthViewLis.eq(tempEMonth).addClass('onFocus');
                }
            }else{
                if(tempSMonth > tempEMonth){
                                         //If the selected start month is larger, the date is assigned to the start month
                    eMonthViewLis.removeClass('onFocus');
                    eMonthViewLis.eq(tempSMonth).addClass('onFocus');
                    putRangeDate();
                }
                eMonthViewLis.each(function(index){
                    if((index) == Number(tempSMonth)){
                        return false;
                    }
                    $(this).addClass('disabled');
                })
            }
        }
                 //Generation date
        function putRangeDate(){
            var sYearDate = $($('.s-cal')[0]).find('.s-calTitle > p').text();
            var sMonthDate = $($('.s-cal')[0]).find('.s-calMonth > li.onFocus').data('month');
            var eYearDate = $($('.s-cal')[1]).find('.s-calTitle > p').text();
            var eMonthDate = $($('.s-cal')[1]).find('.s-calMonth > li.onFocus').data('month');
            tempSYear = sYearDate;
            tempEyear = eYearDate;
            tempSMonth = Number(sMonthDate) - 1;
            tempEMonth = Number(eMonthDate) - 1;
            timePickerDom.text(sYearDate+'-'+sMonthDate+' - '+eYearDate+'-'+eMonthDate);
            changeView();
        }
                 //Assign style to View
        function putDateView(sy,ey,sm,em){
                         sy && sYearView.text(sy);//Assign the starting year
                         ey && eYearView.text(ey);//The end year of assignment
                         sm && sMonthViewLis.eq(sm).addClass('onFocus');//Highlight the starting month
                         em && eMonthViewLis.eq(em).addClass('onFocus'); //Highlight termination month
        }
                 //Fetch the assignment style to the View
        function getRangeDate(){
            var datePeriod = timePickerDom.text().split(' - ');
                         var sDate = datePeriod[0].split('-'); //start year and month
                         var eDate = datePeriod[1].split('-'); //End year and month
            tempSYear = sDate[0];
            tempEyear = eDate[0];
            tempSMonth = Number(sDate[1]) - 1;
            tempEMonth = Number(eDate[1]) - 1;
            putDateView(tempSYear,tempEyear,tempSMonth,tempEMonth);
        }
        getRangeDate();
        changeView();
                 //Previous year 
        $('.s-calLastYear').click(function(e){
            var startDateDom = $(e.target).next('p');
            startDateDom.text(Number(startDateDom.text()) - 1);
            $(this).parents('.s-cal').find('.s-calMonth > li').removeClass('onFocus');
            changeView(true);
        })
                 //The next year
        $('.s-calNextYear').click(function(e){
            var startDateDom = $(e.target).prev('p');
            startDateDom.text(Number(startDateDom.text()) + 1);
            $(this).parents('.s-cal').find('.s-calMonth > li').removeClass('onFocus');
            changeView(true);
        })
                 //Selected month
        monthViewLis.click(function(){
            tabs.removeClass('active');
            lastTab.addClass('active');
                         //The two if processes use arrows to move to cause no month to be selected
            if(!sMonthViewLis.hasClass('onFocus')){
                sMonthViewLis.eq(0).addClass('onFocus');
            }
            if(!eMonthViewLis.hasClass('onFocus')){
                eMonthViewLis.eq(0).addClass('onFocus');
            }
            $(this).parents('.s-cal').find('.s-calMonth > li').removeClass('onFocus');
            $(this).addClass('onFocus');
            putRangeDate();
        })
        
    }
};
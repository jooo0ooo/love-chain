export class Pager {
    buttonsToShow = 5;
    startPage = 1;
    endPage = 1;
    limit = 10;
    offSet = 0;
    lastPage = 1;
    currentPage = 1;
	prevList = 1;
	nextList = 1;
	totalCount = 1;

	Pager(): void {
	    this.currentPage = 1;
	    this.setOffSet(1);
	    this.setPager(0, 1);
	    this.prevList = this.currentPage - this.buttonsToShow;
	    this.nextList = this.currentPage + this.buttonsToShow;
	}

	setPager(totalPages: number, currentPage: number): void {
	    this.setButtonsToShow(this.buttonsToShow);
	    const halfPagesToShow = Math.floor(this.buttonsToShow / 2);

	    if (totalPages <= this.buttonsToShow) {
	        this.startPage = 1;
	        this.endPage = totalPages;

	    } else if (currentPage - halfPagesToShow <= 0) {
	        this.startPage = 1;
	        this.endPage = this.buttonsToShow;

	    } else if (currentPage + halfPagesToShow == totalPages) {
	        this.startPage = currentPage - halfPagesToShow;
	        this.endPage = totalPages;

	    } else if (currentPage + halfPagesToShow > totalPages) {
	        this.startPage = totalPages - this.buttonsToShow + 1;
	        this.endPage = totalPages;

	    } else {
	        this.startPage = currentPage - halfPagesToShow;
	        this.endPage = currentPage + halfPagesToShow;
	    }

	}

	setButtonsToShow(buttonsToShow: number): void {
	    if (buttonsToShow % 2 != 0) {
	        this.buttonsToShow = buttonsToShow;
	    }
	}
	
	setOffSet(page: number): void {
	    this.offSet = ((page <= 1) ? 0 : page - 1) * this.limit;
	}
	
	setLastPage(totalCount: number): void {
	    this.totalCount = totalCount;
	    if (totalCount % this.limit != 0) {
	        this.lastPage = Math.floor(totalCount / this.limit) + 1;
	    } else {
	        this.lastPage = Math.floor(totalCount / this.limit);
	    }
	}
}

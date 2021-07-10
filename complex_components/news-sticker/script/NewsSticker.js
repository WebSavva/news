class NewsSticker {
    constructor({id, data: newsData, duration = 3e3}) {
        this.newsData = newsData;
        this.id = id;
        this.duration = duration;

        this.stickerElement = document.getElementById(this.id);
        this.stickerTimeBox = this.stickerElement.querySelector('.news-sticker__news-time');
        this.stickerNewsHeading = this.stickerElement.querySelector('.news-sticker__news-heading');
        this.stickerControls = this.stickerElement.querySelector('.news-sticker__controls');
        this.playIcon = this.stickerElement.querySelector('[data-news-sticker-command="play"] i');
        this.stickerLine = this.stickerElement.querySelector('.news-sticker__line');
        this.newsNumber = this.newsData.length - 1;
        this.currentNewsNumber = 0;
        this.isStickerRunning = false;
        this.stickerLine.style.transition = `opacity ${this.duration / 2}ms`;
        
        this.stickerControls.addEventListener("click", ({target}) => {
            const targetBtn = target.closest('[data-news-sticker-command]');
            
            if (!targetBtn) return;
            
            const commandType = targetBtn.dataset.newsStickerCommand;
            
            if (commandType === 'play') {
                if (this.isStickerRunning) {
                    this.stopNewsSticker();
                } else {
                    this.RunNewsSticker();
                }
            } else {
                this.stopNewsSticker();

                if (commandType === 'forward') {
                    this.switchCurrentNewsNumber();
                } else {
                    this.switchCurrentNewsNumber(false);
                }
                this.setCurrentNewsValues();
                this.showCurrentNews();
            } 
        });
        
        this.RunNewsSticker();
    }
    
    onEndOpacityTransition = (e) => {
        const opacityValue = +this.stickerLine.style.opacity;
        
        if (opacityValue === 0 && this.isStickerRunning) this.showCurrentNews();
    }
    
    RunNewsSticker() {
        this.isStickerRunning = true;
        this.stickerLine.style.transition = `opacity ${this.duration / 2}ms`;
        this.stickerLine.ontransitionend = this.onEndOpacityTransition;
        this.switchOffPlayBtn();

        this.showCurrentNews();
    }
    
    showCurrentNews() {
        
        if (this.isStickerRunning) {
            this.stickerLine.style.opacity = 1;
            
            //changing heading of news
            this.stickerNewsHeading.textContent = '';
    
            //triggering off running line
            this.triggerRunningLine();
        } else {
            this.stickerTimeBox.textContent = this.currentNewsTime;
            this.stickerNewsHeading.textContent = this.currentNewsText;
        }
    }
    switchCurrentNewsNumber(isForward = true) {
        if (isForward) {
            this.currentNewsNumber < this.newsNumber ? this.currentNewsNumber++ : this.currentNewsNumber = 0;
        } else {
            this.currentNewsNumber === 0 ? this.currentNewsNumber = this.newsNumber : this.currentNewsNumber--;
        }
    }

    setCurrentNewsValues() {
        ({
            time: this.currentNewsTime,
            text: this.currentNewsText
        } = this.newsData[this.currentNewsNumber]);
    }

    triggerRunningLine() {

        this.setCurrentNewsValues();
        this.runLineAnimation();
    }

    runLineAnimation() {
        this.startAnimationTime = performance.now();
        this.numberLetter = 0;
        this.isStickerRunning = true;
        this.previousTriggeredTime = 0;
        this.secondsPerLetter = Math.ceil(this.duration / this.currentNewsText.length);
        this.processAnimation();
    }

    processAnimation() {
        
        
        if (this.numberLetter <= this.currentNewsText.length) {
            requestAnimationFrame((currentMomentTime) =>{
                if (!this.isStickerRunning) return;
                if ( currentMomentTime - this.previousTriggeredTime > this.secondsPerLetter ) {
                    this.numberLetter++;
                    this.stickerNewsHeading.textContent = this.currentNewsText.slice(0, this.numberLetter);
                    this.previousTriggeredTime = currentMomentTime;
                }
                this.processAnimation();
            });
        } else if (this.isStickerRunning) {
            this.switchCurrentNewsNumber();

            this.delayedFading = setTimeout(() => this.stickerLine.style.opacity = 0, this.duration);
        }
    }
    
    stopNewsSticker() {
        clearTimeout(this.delayedFading);
        this.isStickerRunning = false;
        this.stickerLine.ontransitionend = null;
        this.stickerLine.style.transition = '';
        this.stickerLine.style.opacity = 1;
        this.stickerTimeBox.textContent = this.currentNewsTime;
        this.stickerNewsHeading.textContent = this.currentNewsText;
        this.turnOnPlayBtn();
    }
    switchOffPlayBtn() {
        this.playIcon.classList.remove('fa-play');
        this.playIcon.classList.add('fa-pause');    
    }

    turnOnPlayBtn() {
        this.playIcon.classList.remove('fa-pause');
        this.playIcon.classList.add('fa-play');
    }

}

export default NewsSticker;
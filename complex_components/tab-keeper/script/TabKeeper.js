class TabKeeper {
    constructor(id) {
        this.id = id;
        this.root = document.getElementById(id);
        this.head = this.root.querySelector('.tab-keeper__head');
        this.buttons = Array.from( this.head.querySelectorAll('.tab-keeper__btn') );
        this.contentTabs = Array.from( this.root.querySelectorAll('.tab-keeper__tab-content') );

        this.currentTabNumber = 0;
        this.buttons.forEach((btn) => btn.addEventListener('click', this.hadnleBtnClick.bind(this) ) );
        this.showCurrentTab();
    }

    showCurrentTab() {
        //removing active state from all buttons and tab contents
        this.buttons.forEach((btn) => {
            btn.classList.remove('active');
        });

        this.contentTabs.forEach((tabContent) => tabContent.classList.add('hidden'));

        //displaying current tab
        this.buttons[this.currentTabNumber].classList.add('active');
        this.contentTabs[this.currentTabNumber].classList.remove('hidden');
    }

    hadnleBtnClick({target}) {
        const targetedBtn = target.closest('.tab-keeper__btn');
        
        if (!targetedBtn) return;

        this.currentTabNumber = this.buttons.findIndex((btn) => btn === targetedBtn);

        this.showCurrentTab();
    }
}

export default TabKeeper;
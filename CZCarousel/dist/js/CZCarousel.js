/**
 * Created by caizhi on 16/3/24.
 */
// 控件类
function CZCarousel(options){
    this.options = $.extend({
        autoScrolling : true,
        fitToSectionDelay : 3000,
        elementId : '',
        mouseOverPause : false,
        index : 0,
        timeId : undefined,
        meow : true,
        meowPosition: 'center', // left, right, center
        moveAnimate : 'default', // default, custom
        carouselDiv : null,
        carouselImageUl : null,
        carouselImageLiList : null,
        carouselMeowUl : null,
        carouselMeowLiList : null,
        customMoveAnimate : function(opt){}, // 自定义滑动动画
        onLeave : function(index){}, // 离开某页
        afterLoad : function(index){} // 到达某页
    }, options);
    this.init();
};

CZCarousel.prototype = {
    // 初始化控件
    init : function(){
        this.options.carouselDiv = document.getElementById(this.options.elementId);
        this.options.carouselImageUl = this.options.carouselDiv.getElementsByTagName('ul')[0];
        this.options.carouselImageLiList = this.options.carouselImageUl.getElementsByTagName('li');

        if(this.options.meow){
            this.addMeow();
        }
        this.resetElements();
        if(this.options.autoScrolling){
            this.start();
            if(this.options.mouseOverPause){
                // 添加事件
                this.options.carouselDiv.addEventListener("mouseover", this.pause(),false);
                this.options.carouselDiv.addEventListener("mouseout", this.restart(),false);
            }
        }
    },
    // 开始轮播
    start : function(){
        this.options.timeId = window.setInterval(this.intervalFunction(), this.options.fitToSectionDelay);
    },
    // 暂停播放
    pause : function(){
        var that = this;
        return function(){
            if(that.options.timeId != undefined) {
                clearInterval(that.options.timeId);
            }
        }
    },
    // 重新播放
    restart : function(){
        var that = this;
        return function(){
            that.options.timeId = window.setInterval(that.intervalFunction(), that.options.fitToSectionDelay);
        }
    },
    // 定时播放
    intervalFunction : function(){
        var that = this;
        return function(){
            that.nextPage();
        };
    },
    // 进入下一页
    nextPage : function(){
//        this.pause(this)();
        this.moveTo(this.options.index + 1)();
//        this.restart(this)();
    },
    // 移动到第几张图
    moveTo : function(index){
        var that = this;
        return function(){
            // 离开当前页回调函数
            var isToNextStep = that.options.onLeave(that.options.index == -1?(that.options.carouselImageLiList.length - 1):that.options.index);
            if(isToNextStep != undefined && isToNextStep == false){
                return;
            }
            that.options.index = index;
            var opt = that.resetElements();
            opt.moveWidth = '-' + (index * opt.imgWidth);
            opt.index = index;
            that.moveAnimation(opt);
            // 到达下一页回调函数
            that.options.index = that.options.index == (that.options.carouselImageLiList.length -1)? -1:that.options.index;
            that.options.afterLoad(that.options.index == -1? (that.options.carouselImageLiList.length -1):that.options.index);
        }
    },
    // 变换喵点
    changeMeow : function(){
        for(var i=0;i<this.options.carouselMeowLiList.length;i++){
            if(i == this.options.index){
                addClass(this.options.carouselMeowLiList[i], 'active');
            } else {
                removeClass(this.options.carouselMeowLiList[i], 'active');
            }
        }
    },
    // 重置元素
    resetElements : function(){

        var parentNode = this.options.carouselDiv.parentNode;
        var czCarouselWidth = parentNode.offsetWidth;
        //this.options.carouselDiv.style.width = czCarouselWidth + 'px';

        for(var j=0;j<this.options.carouselImageLiList.length;j++){
            this.options.carouselImageLiList[j].style.width = czCarouselWidth + 'px';
        }
        this.options.carouselImageUl.style.width = (czCarouselWidth * this.options.carouselImageLiList.length) + 'px';

        var li = this.options.carouselImageLiList[this.options.index];
        var img = li.getElementsByTagName('img')[0];
        var width = img.offsetWidth;

        var ulWidth = this.options.carouselImageLiList.length * czCarouselWidth;

        return {
            el : this.options.carouselImageUl,
            ulWidth: ulWidth,
            moveWidth : '-' + (this.options.index * width),
            imgWidth : width,
            index : this.options.index,
            totalNum : this.options.carouselImageLiList.length
        };

    },
    // 设置动画
    moveAnimation : function(opt){
        if(this.options.moveAnimate == 'default'){
            // 默认动画
            var translateX = 'translateX(' + opt.moveWidth + 'px' + ');';
            var transform = '-moz-transform:' + translateX;
            transform += '-webkit-transform:' + translateX;
            transform += '-o-transform:' + translateX;
            transform += '-ms-transform:' + translateX;
            transform += 'transform:' + translateX;
            var transition = '-webkit-transition: -webkit-transform .5s ease-in;';
            transition += '-o-transition: -o-transform .5s ease-in;';
            transition += '-moz-transition: -ms-transform .5s ease-in;';
            transition += 'transition: transform .5s ease-in;';
            var style = 'width: ' + opt.ulWidth + 'px;' + transform + transition;
            //'width: ' + opt.ulWidth + 'px;transform:translateX(' + opt.moveWidth + 'px' + ');transition: transform .5s ease-in;'
            opt.el.setAttribute('style', style);
        } else if(this.options.moveAnimate == 'custom'){
            // 自定义动画
            this.options.customMoveAnimate(opt);
        }
        this.options.carouselDiv = opt.el;

        this.changeMeow();
    },
    // 添加喵点
    addMeow : function(){
        var ul = document.createElement("ul");
        if(this.options.meowPosition == 'center'){
            ul.setAttribute('class', 'cz-carousel-meow center-side');
        } else if(this.options.meowPosition == 'left'){
            ul.setAttribute('class', 'cz-carousel-meow left-side');
        } else if(this.options.meowPosition == 'right'){
            ul.setAttribute('class', 'cz-carousel-meow right-side');
        }
        for(var i=0;i<this.options.carouselImageLiList.length;i++){

            var li = document.createElement("li");
            if(i==0) li.setAttribute('class', 'active');
            ul.appendChild(li);
            li.addEventListener("click", this.moveTo(i),false);
        }
        this.options.carouselDiv.appendChild(ul);
        this.options.carouselMeowUl = this.options.carouselDiv.getElementsByTagName('ul')[1];
        this.options.carouselMeowLiList = this.options.carouselMeowUl.getElementsByTagName('li');
    }
};

function hasClass(obj, cls) {
    return obj.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));
}

function addClass(obj, cls) {
    if (!this.hasClass(obj, cls)) obj.className += " " + cls;
}

function removeClass(obj, cls) {
    if (hasClass(obj, cls)) {
        var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
        obj.className = obj.className.replace(reg, ' ');
    }
}

function toggleClass(obj,cls){
    if(hasClass(obj,cls)){
        removeClass(obj, cls);
    }else{
        addClass(obj, cls);
    }
}
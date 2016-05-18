/**
 * Created by caizhi on 16/4/30.
 */


function CZLotteryTurntable(options){
    this.setting = options;

    this.parentElement = document.getElementById(this.setting.elementId);

    this.init();

    // 开始
    this.start = function(deg){
        console.log("start...");

        createjs.Tween.get(this.getContainer())
            .to({rotation:360 * 40 + deg}, 20000, createjs.Ease.quartInOut)  // createjs.Ease.circInOut    quartInOut
            .call(handleComplete);

            function handleComplete() {
                //Tween complete
                console.log("handleComplete...");
            }
    };
    // 复原
    this.recovery = function(){
        createjs.Tween.get(this.getContainer())
            .to({rotation:0}, 10, createjs.Ease.quartInOut);
    };
}

CZLotteryTurntable.prototype = {
    init:function(){
        this.createCanvas();
        this.createTurntable();
        this.updateStage();
    },
    createCanvas: function(){
        var canvas = document.createElement("canvas");
        canvas.setAttribute("width", this.parentElement.offsetWidth);
        canvas.setAttribute("height", this.parentElement.offsetHeight);
        //canvas.setAttribute("id", "myTurntable");
        //canvas.style.backgroundColor = "#EEEEEE";
        this.parentElement.appendChild(canvas);
        this.myTurntable = canvas;
        this.stage = new createjs.Stage(this.myTurntable);
    },
    createTurntable: function(){
        // 创建转盘
        var circle = new createjs.Shape();
        var graphics = circle.graphics;
        graphics.setStrokeStyle(0).beginStroke("#EEEEEE").beginFill("red");
        // 填充背景
        this.createBackGroupImage(graphics, this.setting.radius*2, this.setting.radius*2);
        graphics.drawCircle(0,0,this.setting.radius);
        graphics.x = 0;
        graphics.y = 0;
        // 获取container
        this.container = this.getContainer();
        this.container.addChild(circle);
        // 创建指针
        this.createPointer();
    },
    createBackGroupImage: function(graphics, shapeWidth, shapeHeight){
        // 创建背景
        var bitmap = new createjs.Bitmap(this.setting.turntableBgUrl);
        var image = bitmap.image;
        var scaleY = shapeWidth/image.height;
        var scaleX = shapeHeight/image.width;
        var matrix2D = new createjs.Matrix2D(scaleX,0,0,scaleY,-this.setting.radius,-this.setting.radius);
        graphics.beginBitmapFill(image, "no-repeat", matrix2D);
        graphics.drawCircle(0,0,this.setting.radius);
        graphics.x = 0;
        graphics.y = 0;
    },
    getContainer: function(){
        // 创建容器
        if(this.container == null){
            this.container = new createjs.Container();
            this.container.x = this.setting.centerX;
            this.container.y = this.setting.centerY;
            this.stage.addChild(this.container);
        }
        return this.container;
    },
    createPointer: function(){
        var rect = new createjs.Shape();
        var rectGraphics = rect.graphics;
        var rectWidth = 5;
        var rectHeight = this.setting.radius;
        rectGraphics.setStrokeStyle(1).beginStroke("#000000").beginFill("red")
            .drawRect(this.setting.centerX,this.setting.centerX,rectWidth,rectHeight);
        rect.regX = this.setting.centerX;
        rect.regY = this.setting.centerY;
        rect.x = this.setting.centerX + (rectWidth/2);
        rect.y = this.setting.centerY;
        rect.rotation = 180;
        this.stage.addChild(rect);
    },
    updateStage: function(){
        var that = this;
        createjs.Ticker.setFPS(60);
        createjs.Ticker.addEventListener("tick", function tick(event) {
            that.stage.update();
        })
    }
}


var lotteryTurntable = new CZLotteryTurntable(setting = {
    elementId: 'myTurntableDiv', // 父div
    turntableBgUrl: 'dist/images/turntable.jpg', // 转盘背景图片
    radius : 150, // 半径
    centerX : 150, // 转盘圆心x坐标
    centerY : 150 // 转盘圆心y坐标
});

function start(){
    // ajax获取deg
    var deg =  Math.floor(Math.random()*12+1) * 30; //1-10
    console.log("deg : " + deg);
    lotteryTurntable.start(deg);
}

function recovery(){
    lotteryTurntable.recovery();
}

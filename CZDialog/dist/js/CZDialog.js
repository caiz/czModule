/**
 * Created by caizhi on 16/4/29.
 */

function CZDialog(options){
    this.settings = options;
    var that = this;
    var body = document.body;
    this.alert = function(content, title, btnOptions){
        // 创建遮罩层
        createCZMark(content, title, btnOptions);
        // 创建对话框
        createDialog(content, title, btnOptions);
    };
    // 创建遮罩层
    function createCZMark() {
        var czMark = document.createElement("div");
        czMark.setAttribute("class", 'cz-mark');
        body.appendChild(czMark);

    }
    // 创建对话框
    function createDialog(content, title, btnOptions){
        // 创建对话框
        var czDialog = document.createElement("div");
        czDialog.setAttribute("class", 'cz-dialog');
        body.appendChild(czDialog);
        // 创建title
        createDialogTitle(czDialog, title);
        // 创建content
        createDialogContent(czDialog, content);
        // 创建按钮
        createDialogButtonRow(czDialog, btnOptions);

    }
    // 创建对话框title
    function createDialogTitle(parent, title){
        // 设置title
        var czDialogHeader = document.createElement("div");
        czDialogHeader.setAttribute("class", 'cz-dialog-header ' + getTextAlign(that.settings.headerAlign));
        czDialogHeader.innerHTML = title;
        parent.appendChild(czDialogHeader);
    }
    // 创建对话框content
    function createDialogContent(parent, content){
        // 设置内容
        var czDialogContent = document.createElement("div");
        czDialogContent.setAttribute("class", 'cz-dialog-content ' + getTextAlign(that.settings.contentAlign));
        czDialogContent.innerHTML = content;
        parent.appendChild(czDialogContent);
    }
    // 创建按钮行
    function createDialogButtonRow(parent, btnOptions){
        // 设置按钮
        if(btnOptions !== undefined && btnOptions instanceof Array){
            // 创建按钮行
            var czDialogButtonRow = document.createElement("div");
            czDialogButtonRow.setAttribute("class", 'cz-dialog-button-row ' + getTextAlign(that.settings.buttonAlign));
            parent.appendChild(czDialogButtonRow);
            // 添加按钮
            createDialogButtons(czDialogButtonRow, btnOptions);
        }
    }
    // 创建按钮
    function createDialogButtons(parent, btnOptions){
        for(var i=0;i < btnOptions.length;i++){
            var btnOption = btnOptions[i];
            var btn = document.createElement("div");
            btn.setAttribute("class", 'cz-btn');
            btn.innerHTML = btnOption.text;
            parent.appendChild(btn);
            // 绑定按钮事件
            addEvent(btn,"click",btnEvent(btnOption.callBack, btnOption.autoClose));
        }
    }

    function getTextAlign(align){
        if(align === 'center'){
            return "cz-text-align-center";
        }else if(align === 'left'){
            return "cz-text-align-left";
        }else if(align === 'right'){
            return "cz-text-align-right";
        }else {
            return "cz-text-align-center";
        }
    };

    // 关闭对话框
    this.close = function(){
        document.body.removeChild(document.getElementsByClassName('cz-mark')[0]);
        document.body.removeChild(document.getElementsByClassName('cz-dialog')[0]);
    };

    // 按钮事件
    function btnEvent(callBack, isClose){
        var dialogThat = that;
        return function(e){
            callBack(that, this);
            if(isClose === undefined || isClose === true){
                dialogThat.close();
            }
        }
    };
}

// 绑定事件 -- 兼容写法
function addEvent(obj,type,handle){
    try{  // Chrome、FireFox、Opera、Safari、IE9.0及其以上版本
        obj.addEventListener(type,handle,false);
    }catch(e){
        try{  // IE8.0及其以下版本
            obj.attachEvent('on' + type,handle);
        }catch(e){  // 早期浏览器
            obj['on' + type] = handle;
        }
    }
}



<!--调用示例-->
//<script type="text/javascript">
//var czDialog = new CZDialog({
//    contentAlign: 'center', // left right center
//    headerAlign: 'center', // left right center
//    buttonAlign: 'center' // left right center
//});
//function openAlert() {
//    czDialog.alert("你确定要这样操作吗?", "警告", [
//        {
//            text: '取消',  // 按钮名称
//            type: 'cancel',  // 按钮类型
//            autoClose: true,  // 是否点击完自动关闭 默认关闭
//            callBack: function(obj, btn){
////                    console.log(obj);
////                    console.log(btn);
//            }},
//        {
//            text: '确定',
//            type: 'confirm',
//            autoClose: false,
//            callBack: function(obj, btn){
////                    console.log(obj);
////                    console.log(btn);
////                    czDialog.close();  // 关闭对话框
//            }}
//    ]);
//}
//</script>
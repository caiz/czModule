/**
 * Created by caizhi on 16/5/18.
 */

function CZLoading(options){
    this.settings = {
        loadingImgUrl: 'dist/images/loading.gif',
        loadingTxt: '正在顽命加载...'
    };
    if(options.loadingImgUrl !== undefined && options.loadingImgUrl !== null)
        this.settings.loadingImgUrl = options.loadingImgUrl;
    if(options.loadingTxt !== undefined && options.loadingTxt !== null)
        this.settings.loadingTxt = options.loadingTxt;

    var that = this;
    var body = document.body;

    var loading = null;
    var mark = null;

    // 创建遮罩
    var createMark = function(){
        var markDiv = document.createElement('div');
        markDiv.setAttribute('class', 'cz-loading-mark');
        body.appendChild(markDiv);
        mark = markDiv;
    };
    // 创建loading div
    var createLoading = function(){
        var loadingDiv = document.createElement('div');
        loadingDiv.setAttribute('class', 'cz-loading-div');

        var loadingImgRow = document.createElement('div');
        loadingImgRow.setAttribute('class', 'cz-loading-img');

        var loadingImg = document.createElement('img');
        var loadingImgUrl = that.settings.loadingImgUrl;
        loadingImg.setAttribute('src', loadingImgUrl);

        loadingImgRow.appendChild(loadingImg);

        var loadingTxtRow = document.createElement('div');
        loadingTxtRow.setAttribute('class', 'cz-loading-txt');
        loadingTxtRow.innerHTML = that.settings.loadingTxt;

        loadingDiv.appendChild(loadingImgRow);
        loadingDiv.appendChild(loadingTxtRow);
        body.appendChild(loadingDiv);

        loading = loadingDiv;
    };

    this.openLoading = function(){
        createMark();
        createLoading();
    };

    this.closeLoading = function(){
        document.body.removeChild(loading);
        document.body.removeChild(mark);
    };

}


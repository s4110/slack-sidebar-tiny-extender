

/* ---------------------------------------------------------------------------
  Main functions.
  ---------------------------------------------------------------------------*/
// Init sidebar extend.
let SSTEsidebarExtend = () => {
    chrome.storage.local.get('SSTEWidth', function(val){
        if(val.SSTEWidth['width']){
            $('.client_channels_list_container').css('width', val.SSTEWidth['width']);
        }
    });
    $('.client_channels_list_container').resizable({
        handles: 'e',
        minWidth: 220,
        maxWidth: 500,
        stop: function(event, ui ){
            var dataset = {
                width : 500,
                reset: false
            };
            if(ui.size.width <= 500){
                dataset['width'] = ui.size.width;
            }
            chrome.storage.local.set({SSTEWidth: dataset}, function() {});
        }
    });
};

// Reset sidebar width.
let SSTEsidebarReset = () => {
    $('.client_channels_list_container').css('width', 220);
    var dataset = {
        width : 220,
        reset: false
    };
    chrome.storage.local.set({SSTEWidth: dataset}, function() {});
};

// change post color for mentioned post.
let SSTEchangeMentionColor = () => {
    var mention = $('.c-virtual_list__item').find('.c-member_slug--mention');
    if(mention.length > 0){
        var target = mention.closest('.c-message');
        target.addClass('SSTEmention');

        target.each(function(){
            if($(this).hasClass('c-message--last')){
                $(this).css('background-color', '#ffcfcf');
            }
        });
    }
};

/* ---------------------------------------------------------------------------
  Catch dom change.
  ---------------------------------------------------------------------------*/

// Get dom change event when loading.
var LoadingObserver = new MutationObserver(function (MutationRecords, MutationObserver) {
    if (!$('body').hasClass('loading')){
        SSTEsidebarExtend();
        SSTEchangeMentionColor();
    }
});

// Get dom change event when loading.
LoadingObserver.observe($('body').get(0), {
    attributes: true,
    attributeFilter: ["class"]
});

// Get dom change event for mention.
var mentionObserver = new MutationObserver(function (MutationRecords, MutationObserver) {
    SSTEchangeMentionColor();
});

// Get dom change event for mention.
mentionObserver.observe($('#messages_container').get(0), {
    childList: true,
    subtree: true,
});


/* ---------------------------------------------------------------------------
  Local storage.
  ---------------------------------------------------------------------------*/
// Get chrome local value change.
chrome.storage.onChanged.addListener(function(changes, namespace) {
    for (key in changes) {
        var storageChange = changes[key];
        if(key === 'SSTEWidth' && storageChange.newValue['reset'] === true) {
            SSTEsidebarReset();
        }
    }
});


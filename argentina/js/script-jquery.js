//ARRAYS OF PHOTOS
var patagoniaImages = ['el-calafate','el-calafate-patagonia','glacier-close-patagonia','glacier-patagonia','glacier-patagonia-far','patagonia-cabins','patagonia-plain','patagonia-sky','patagonia-spring'];

var mendozaImages= ['foothills-mendoza-argentina','fountain-mendoza-argentina','lakeside-mendoza-argentina','mountain-road-mendoza-argentina','mountains-mendoza-argentina','plains-mendoza-argentina','river-mendoza-argentina','riverside-mendoza-argentina-vineyard','sulphur-mendoza-argentina','vines-mendoza-argentina','volcano-mendoza-argentina','waterside-vineyard-mendoza-argentina'];

var iguazuFallsImages = ['aerial-view-iguazu-falls-argentina','bridge-iguazu-falls-argentina','iguazu-falls-beautiful-aerial-view','iguazu-falls-below','iguazu-falls-far','intense-iguazu-falls-argentina','mist-iguazu-falls','sunset-iguazu-falls','up-close-iguazu-falls-argentina'];

var cordobaImages = ['casa-vieja-cordoba-argentina','cordoba-argentina-cute-house','cordoba-argentina-landscape','statues-cordoba-argentina','catedral-de-cordoba-argentina'];

var buenosAiresImages = ['argentina-buenos-aires-day','buenos-aires-at-night','buenos-aires-buildings','buenos-aires-casa-rosada-close','casa-rosada-buenos-aires-argentina','la-boca-buenos-aires-argentina','puerto-madero-buenos-aires','puerto-madero-buenos-aires-argentina','recoleta-cemetery-buenos-aires-argentina'];

//variable for the gallery container dom element
var $galleryContainer = $('#gallery-container');

//filepath to the images
var filePathToImages = 'images/gallery-images/';

//FUNCTION TO GET PHOTOS FROM FLICKR API
//CALLED WHEN PAGE LOADS
function getFlickrPhotos() {
    $.ajax({
        dataType: 'json',
        url: 'https://api.flickr.com/services/rest/?method=flickr.photos.search&name=value&api_key=8f85fae7b30b1d0fa402c01a4972c763&format=json&nojsoncallback=1&text=Patagonia,Argentina&content_type=1&safe_search=1&tags=Argentina,Patagonia',
        method: 'get',
        success: function(response){
            var responseObj = response.photos;
            for(var i = 0; i < 12; i++) {
                var farmId = responseObj.photo[i].farm;
                var photoId = responseObj.photo[i].id;
                var serverId = responseObj.photo[i].server;
                var secret = responseObj.photo[i].secret;
                var $img = $('<img>');
                $img.attr('src','https://farm'+ farmId + '.staticflickr.com/'+ serverId + '/' + photoId + '_' + secret + '.jpg');
                console.log($img);
                $img.appendTo($galleryContainer);
            }
        },
        error: function(response) {
            var $galleryContainer = $('#gallery-container');
            var $noPhotos = $('<p>').text('Unfortunately, we are experiencing technical difficulties.  Please try again' +
                ' later.');
            $galleryContainer.append($noPhotos);
        }
    });
};
getFlickrPhotos();

//CLICK HANDLER FOR DISPLAYING THE GALLERY CHOICES
var $galleryControls = $('.gallery-controls ul');
$('.gallery-displayed').click(function() {
    $galleryControls.toggleClass('gallery-choices');
});

//CLICK HANDLER TO GET THE VALUE OF THE USER'S CHOICE OF LOCATIONS TO VIEW
$('.choose-destination').on('click', 'li', function(){
    $galleryContainer.empty();
    //get the value of the list item clicked
    var $listItem = $(this).text();
    $('.gallery-displayed').text($listItem);
    $galleryControls.toggleClass('gallery-choices');
    console.log($listItem);
    constructGallery($listItem);
});

function addGallery(imageArray, filePathWithFolder) {
    console.log('Here is the value of imageArray and filePathWithFolder', imageArray, filePathWithFolder);
    for (var i = 0; i < imageArray.length; i++) {
        var $img = $('<img>');
        $img.attr('src', filePathWithFolder + imageArray[i] + '.jpg');
        $galleryContainer.append($img);
    }
}

function constructGallery(destination) {
    console.log('Here is the destination :  ', destination);
    var imageArray;
    var filePathWithFolder;
    switch(destination){
        case 'Patagonia':
            filePathWithFolder = filePathToImages + 'patagonia/';
            imageArray = patagoniaImages;
            break;
        case 'Mendoza':
            filePathWithFolder = filePathToImages + 'mendoza/';
            imageArray = mendozaImages;
            break;
        case 'Iguazu Falls':
            filePathWithFolder = filePathToImages + 'iguazu-falls/';
            imageArray = iguazuFallsImages;
            break;
        case 'Cordoba':
            filePathWithFolder = filePathToImages + 'cordoba/';
            imageArray = cordobaImages;
            break;
        case 'Buenos Aires':
            filePathWithFolder = filePathToImages + 'buenos-aires/';
            imageArray = buenosAiresImages;
            break;
        default:
            filePathWithFolder = filePathToImages + 'buenos-aires/';
            imageArray = buenosAiresImages;

    }
    addGallery(imageArray,filePathWithFolder);
}






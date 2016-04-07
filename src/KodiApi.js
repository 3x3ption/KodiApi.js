require('./JsonRpc.js');
require('./KodiApiConnection.js');
require('./KodiAddonApi.js');
require('./KodiApplicationApi.js');
require('./KodiAudioLibaryApi.js');
require('./KodiPlayerApi.js');
require('./KodiPlaylistApi.js');

function KodiApi(ip, port) {
    var self = this;
    this.connection = new KodiApiConnection(ip, port);
    this.apis = [];
}

KodiApi.prototype.isApiInitiated = function(key, id) {
    if(this.apis[key] == undefined)
        return false;
    else if(id != undefined && this.apis[key][id] === undefined)
        return false;

    return true;
}
KodiApi.prototype.get = function(key, id) {
    key = key.toLowerCase();

    if(!this.isApiInitiated(key, id))
        this.initiateApi(key, id);

    if(id != undefined)
        return this.apis[key][id];

    return this.apis[key];
}
KodiApi.prototype.initiateApi = function(key, id) {
    switch(key) {
        case 'addon':
            this.apis[key][id] = new KodiAddonApi(this.connection, id);
            break;
        case 'application':
            this.apis[key] = new KodiApplicationApi(this.connection);
            break;
        case 'player':
            this.apis[key][id] = new KodiPlayerApi(this.connection, id);
            break;
        case 'playlist':
            this.apis[key][id] = new KodiPlaylistApi(this.connection, id);
            break;
        case 'audiolibrary':
            this.apis[key] = new KodiAudioLibraryApi(this.connection);
            break;
        default:
            console.log('Error: Api not found ' + key);
    }
}
global.KodiApi = KodiApi;
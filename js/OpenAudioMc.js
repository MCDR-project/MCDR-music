import {TimeService} from "./modules/socket/TimeService";
import {Messages} from "./modules/ui/Messages";
import {UserInterfaceModule} from "./modules/ui/UserInterfaceModule";
import {HueModule} from "./modules/hue/HueModule";
import {MediaManager} from "./modules/media/MediaManager";
import {SocketModule} from "./modules/socket/SocketModule";
import {Handlers} from "./modules/socket/Handlers";
import {HueConfigurationModule} from "./modules/hue/HueConfigurationModule";
import {Getters} from "./helpers/Getters";
import {SocketDirector} from "./modules/socket/SocketDirector";
import {AlertBox} from "./modules/ui/Notification";
import {VoiceModule} from "./modules/voice/VoiceModule";
import {NotificationModule} from "./modules/notifications/NotificationModule";
import ClientTokenSet from "./helpers/ClientTokenSet";
import {initAudioContext} from "./modules/voice/objects/AbstractAudio";
import {getHueInstance} from "./helpers/JsHue";
import openAudioMc, {linkBootListeners} from "./helpers/StaticFunctions";

export class OpenAudioMc extends Getters {

    constructor() {
        super();

        this.tokenSet = new ClientTokenSet().fromUrl(window.location.href);

        if (this.tokenSet == null) {
            document.getElementById("welcome-text-landing").innerHTML = "The audio client is only available for players who are online in the server. Use <small>/audio</small> to obtain a URL<br />";
            return;
        }

        this.notificationModule = new NotificationModule(this);
        this.timeService = new TimeService();
        this.messages = new Messages(this);
        this.userInterfaceModule = new UserInterfaceModule(this);
        this.hueConfiguration = new HueConfigurationModule(this);
        this.hueModule = new HueModule(this, getHueInstance());
        this.mediaManager = new MediaManager(this);
        this.userInterfaceModule.showVolumeSlider(false);
        this.userInterfaceModule.setMessage("Loading proxy..");

        //initialize audio encoding
        initAudioContext();

        this.voiceModule = new VoiceModule(this);
        this.boot();

        // request a socket service, then do the booting
        const director = new SocketDirector("https://craftmendserver.eu:444");
        director.route()
            .then((host) => {
                this.socketModule = new SocketModule(this, host);
                this.messages.apply();

                // setup packet handler
                new Handlers(this);
            })
            .catch((error) => {
                console.error("Exception thrown", error.stack);
                this.userInterfaceModule.kickScreen("Your current URL appears to be invalid. Please request a new one in-game using the /audio command. If this issue if persists please contact a member of staff.")
                new AlertBox('#alert-area', {
                    closeTime: 20000,
                    persistent: false,
                    hideCloseButton: true,
                    extra: 'warning'
                }).show('A networking error occurred while connecting to the server, please request a new url and try again.');
            });
    }
}

linkBootListeners();

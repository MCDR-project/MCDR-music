"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

!function (e) {
  var t = {};function s(n) {
    if (t[n]) return t[n].exports;var i = t[n] = { i: n, l: !1, exports: {} };return e[n].call(i.exports, i, i.exports, s), i.l = !0, i.exports;
  }s.m = e, s.c = t, s.d = function (e, t, n) {
    s.o(e, t) || Object.defineProperty(e, t, { enumerable: !0, get: n });
  }, s.r = function (e) {
    "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }), Object.defineProperty(e, "__esModule", { value: !0 });
  }, s.t = function (e, t) {
    if (1 & t && (e = s(e)), 8 & t) return e;if (4 & t && "object" == (typeof e === "undefined" ? "undefined" : _typeof(e)) && e && e.__esModule) return e;var n = Object.create(null);if (s.r(n), Object.defineProperty(n, "default", { enumerable: !0, value: e }), 2 & t && "string" != typeof e) for (var i in e) {
      s.d(n, i, function (t) {
        return e[t];
      }.bind(null, i));
    }return n;
  }, s.n = function (e) {
    var t = e && e.__esModule ? function () {
      return e.default;
    } : function () {
      return e;
    };return s.d(t, "a", t), t;
  }, s.o = function (e, t) {
    return Object.prototype.hasOwnProperty.call(e, t);
  }, s.p = "", s(s.s = 0);
}([function (e, t, s) {
  "use strict";
  s.r(t);
  var n = function () {
    function n() {
      _classCallCheck(this, n);

      this.isServerAhead = !1, this.msOffset = 0;
    }

    n.prototype.sync = function sync(e, t) {
      var s = new Date(e),
          n = new Date().getTime(),
          i = new Date(n += 60 * t * 60 * 1e3);this.isServerAhead = s.getTime() > i.getTime(), this.msOffset = this.isServerAhead ? s.getTime() - i.getTime() : i.getTime() - s.getTime();
    };

    n.prototype.getPredictedTime = function getPredictedTime() {
      return this.isServerAhead ? new Date(new Date().getTime() + this.msOffset) : new Date(new Date().getTime() - this.msOffset);
    };

    return n;
  }();

  var i = function () {
    function i(e) {
      _classCallCheck(this, i);

      this.main = e, this.hueConnected = 'You are now connected with your Philips Hue Lights! Please select your group (you can always change this later) and click "player" in the left bottem corner to return to the home menu.', this.hueLinking = "Press the link button on your hue bridge within %sec% seconds to connect.", this.hueWelcome = "Your Philips Hue lights have not yet been setup with OpenAudioMc. Doing so will give the minecraft server (limited) control over your selected lights to enhance your experience.", this.welcomeMessage = "このページではアトラクションBGM、エリアBGM、ショーBGMを楽しむことができます！", this.errorMessage = "MCDRからログアウトした為接続を解除しました...";
    }

    i.prototype.apply = function apply() {
      null != document.getElementById("hue-welcome-message") && (document.getElementById("hue-welcome-message").innerHTML = this.hueWelcome), "ok" === this.main.socketModule.state ? document.getElementById("status-message").innerHTML = this.welcomeMessage : document.getElementById("status-message").innerHTML = this.errorMessage;
    };

    return i;
  }();

  var o = function () {
    function o() {
      var _this = this;

      _classCallCheck(this, o);

      document.getElementById("welcome").style.display = "none", document.getElementById("app").style.display = "", document.getElementById("hue-bridge-menu-button").onclick = function () {
        return _this.showHue();
      }, document.getElementById("show-main-button").onclick = function () {
        return _this.showMain();
      };
    }

    o.prototype.setMessage = function setMessage(e) {
      document.getElementById("status-message").innerHTML = e;
    };

    o.prototype.showMain = function showMain() {
      document.getElementById("welcome").style.display = "none", document.getElementById("hueMenu").style.display = "none", document.getElementById("app").style.display = "";
    };

    o.prototype.showHue = function showHue() {
      document.getElementById("welcome").style.display = "none", document.getElementById("hueMenu").style.display = "", document.getElementById("app").style.display = "none";
    };

    o.prototype.showVolumeSlider = function showVolumeSlider(e) {
      document.getElementById("volume-label").style.display = e ? "" : "none";
    };

    return o;
  }();

  var r = function () {
    function r(e, t) {
      var _this2 = this;

      _classCallCheck(this, r);

      this.hue = jsHue(), this.bridges = [], this.isSsl = document.location.href.startsWith("https://"), this.isLinked = !1, this.currentBridge = null, this.currentUser = null, this.color = net.brehaut.Color, this.options = t, this.openAudioMc = e, this.lights = [], this.hue.discover().then(function (e) {
        e.forEach(function (e) {
          _this2.bridges.push(e), _this2.onDiscover();
        });
      }).catch(function (e) {
        return console.log("Error finding bridges", e);
      }), this.isSsl && e.log("Failed to initiate Philips Hue integration since this web page is served over ssl. The user will be promted to downgrade to HTTP when a user interaction is made that is related to Hue"), document.getElementById("startup-hue").onclick = function () {
        return _this2.startSetup();
      };
    }

    r.prototype.onDiscover = function onDiscover() {
      if (0 !== this.bridges.length) {
        if (this.openAudioMc.log(this.bridges.length + " hue bridges found"), document.getElementById("hue-bridge-menu-button").style.display = "", this.isSsl) return void (document.getElementById("select-bridge").innerHTML = "<p><i>So close... yet so far...</i> Unfortunately, Philips Hue is not supported over SSL (https), please reaload this page over HTTP (in the address bar) to hue the hue integration.</p>");null != this.options.userid && (document.getElementById("select-bridge").innerHTML = "<p>Loading auto connect.</p>", this.openAudioMc.getHueModule().startSetup());
      } else openAudioMc.log("No hue bridges found");
    };

    r.prototype.startSetup = function startSetup() {
      var e = this;this.bridges.forEach(function (t) {
        e.linkBridge(t.internalipaddress);
      });
    };

    r.prototype.onConnect = function onConnect() {
      var _this3 = this;

      var e = this;document.getElementById("select-bridge").innerHTML = "<p>Preparing user..</p>", this.currentUser.getGroups().then(function (t) {
        for (var s in document.getElementById("select-bridge").innerHTML = "<p>" + _this3.openAudioMc.getMessages().hueConnected + "</p><select id='input-bridge-select' class=\"blue-select\" id='brige-list'><option value=\"\" disabled selected id='default-group'>Select a group</option></select>", document.getElementById("input-bridge-select").oninput = function () {
          _this3.selectGroup(document.getElementById("input-bridge-select").value);
        }, t) {
          document.getElementById("brige-list").innerHTML += "<option>" + t[s].name + "</option>", null != e.options.group && t[s].name === e.options.group && (_this3.updateSelector(t[s].name), _this3.selectGroup(t[s].name));
        }
      });
    };

    r.prototype.updateSelector = function updateSelector(e) {
      setTimeout(function () {
        document.getElementById("default-group").selected = !1, document.getElementById("brige-list").value = e;
      }, 200);
    };

    r.prototype.selectGroup = function selectGroup(e) {
      Cookies.set("huegroup", e);var t = this;this.currentUser.getGroups().then(function (s) {
        for (var n in s) {
          if (s[n].name === e) for (var i in t.lights = [], s[n].lights) {
            i++, t.lights.push(i), t.setLight(i, "rgba(58,50,238,0.5)");
          }
        }
      });
    };

    r.prototype.colorToHueHsv = function colorToHueHsv(e) {
      var t = this.color(e).toHSV();return { on: 2 * t.alpha * 127.5 != 0, hue: Math.floor(65535 * t.hue / 360), sat: Math.floor(255 * t.saturation), bri: Math.round(2 * t.alpha * 127.5) };
    };

    r.prototype.setUserId = function setUserId(e) {
      Cookies.set("hueid", e);
    };

    r.prototype.setLight = function setLight(e, t) {
      var _this4 = this;

      var s = [];"number" == typeof e ? s.push(this.lights[e - 1]) : e.startsWith("[") ? JSON.parse(e).forEach(function (e) {
        s.push(_this4.lights[e - 1]);
      }) : s.push(this.lights[parseInt(e) - 1]), s.forEach(function (e) {
        _this4.currentUser.setLightState(e, _this4.colorToHueHsv(t)).then(function (e) {});
      });
    };

    r.prototype.linkBridge = function linkBridge(e, t) {
      var _this5 = this;

      if (document.getElementById("select-bridge").innerHTML = "<p>Preparing setup..</p>", null == t && null != this.options.userid) return document.getElementById("select-bridge").innerHTML = "<p>Logging in..</p>", this.currentUser = this.hue.bridge(e).user(this.options.userid), void this.currentUser.getGroups().then(function (t) {
        null != t[0] && null == t[0].error ? _this5.linkBridge(e, "error") : (_this5.openAudioMc.log("Linked with hue bridge after trying to connect with the old username"), _this5.isLinked = !0, _this5.onConnect());
      });if (this.currentBridge = this.hue.bridge(e), null == this.currentBridge) return void this.openAudioMc.log("Invalid bridge IP");var s = this;var n = 0,
          i = -1;i = setInterval(function () {
        function e() {
          clearInterval(i);
        }if (++n > 60) return e(), document.getElementById("select-bridge").innerHTML = '<p>Could not connect to your hue bridge after 60 seconds, did you press the link button?</p><span class="button" id=\'startup-hue\' style="color: white;">Click here to try again</span>', void _this5.openAudioMc.log("Failed to authenticate with bridge in 60 seconds.");var t = 60 - n;document.getElementById("select-bridge").innerHTML = "<p>" + _this5.openAudioMc.getMessages().hueLinking.replace("%sec%", t) + "</p>", s.currentBridge.createUser("OpenAudioMc#WebClient").then(function (t) {
          null != t[0].error ? 101 === t[0].error.type || (e(), openAudioMc.log("Unexpected error while connecting: " + t[0].error.type)) : null != t[0].success && (s.currentUser = s.currentBridge.user(t[0].success.username), _this5.openAudioMc.log("Linked with hue bridge after " + n + " attempt(s)."), s.isLinked = !0, s.onConnect(), e());
        });
      }, 1e3);
    };

    return r;
  }();

  var u = function () {
    function u(e) {
      var _this6 = this;

      _classCallCheck(this, u);

      this.sounds = {}, this.masterVolume = 80, this.openAudioMc = e, document.getElementById("volume-slider").oninput = function () {
        _this6.setMasterVolume(document.getElementById("volume-slider").value);
      };
    }

    u.prototype.destroySounds = function destroySounds(e) {
      var _this7 = this;

      this.openAudioMc.debugPrint("<b>starting to quit fade </b> " + e);var t = this;if (null != e && null != t.sounds[e]) t.sounds[e].setVolume(0, 300, function () {
        _this7.openAudioMc.debugPrint("<b>finished fading</b> " + e), null != t.sounds[e] && t.sounds[e].destroy(), delete t.sounds[e], _this7.openAudioMc.debugPrint("<b>stopping</b> " + e + " <b>after fading</b>");
      });else for (var e in this.sounds) {
        "DEFAULT" === this.sounds[e].getFlag() && (null != t.sounds[e] && t.sounds[e].destroy(), delete t.sounds[e]);
      }
    };

    u.prototype.setMasterVolume = function setMasterVolume(e) {
      for (var t in this.masterVolume = e, this.sounds) {
        this.sounds[t].setMasterVolume(e);
      }
    };

    u.prototype.getMasterVolume = function getMasterVolume() {
      return this.masterVolume;
    };

    u.prototype.getSound = function getSound(e) {
      return this.sounds[e];
    };

    u.prototype.registerMedia = function registerMedia(e, t) {
      this.sounds[e] = t, this.openAudioMc.debugPrint("<b>created media</b> " + e);
    };

    return u;
  }();

  var l = function () {
    function l() {
      _classCallCheck(this, l);
    }

    l.calculateVolume = function calculateVolume(e, t) {
      return Math.round(e / t * 100);
    };

    l.getParameter = function getParameter() {
      var e = window.location.href.split("&"),
          t = {};for (var _s = 0; _s < e.length; _s++) {
        var _n = e[_s].split("="),
            _i = decodeURIComponent(_n[0]),
            _o = decodeURIComponent(_n[1]);void 0 === t[_i] ? t[_i] = decodeURIComponent(_o) : "string" == typeof t[_i] ? t[_i] = [t[_i], decodeURIComponent(_o)] : t[_i].push(decodeURIComponent(_o));
      }return t;
    };

    return l;
  }();

  var a = function () {
    function a(e, t) {
      var _this8 = this;

      _classCallCheck(this, a);

      if (this.handlers = {}, this.openAudioMc = e, e.getUserInterfaceModule().setMessage("Loading data.."), e.getUserInterfaceModule().showVolumeSlider(!1), null == l.getParameter().data) return e.debugPrint("data is empty"), void e.getUserInterfaceModule().setMessage("Oh no, the url you currently have entered does not contain the required data for the web client to function. Please go back to the minecraft server and request a new URL with  <b>/audio</b>");e.getUserInterfaceModule().setMessage("Connecting to the OpenAudioMc api servers..");var s = atob(l.getParameter().data).split(":");e.debugPrint("Username: " + s[0]), e.debugPrint("Player uuid: " + s[1]), e.debugPrint("Server uuid: " + s[2]), e.debugPrint("Token: " + s[3]), this.username = s[0], this.playerUuid = s[1], this.severUuid = s[2], this.token = s[3], this.state = "loading", document.getElementById("username-display").innerText = this.username, this.authHeader = "type=client&n=" + this.username + "&player=" + this.playerUuid + "&s=" + this.severUuid + "&p=" + this.token, e.debugPrint(this.authHeader);var n = this;this.socket = io(t, { query: n.authHeader, autoConnect: !1 }), this.socket.on("connect", function () {
        e.getUserInterfaceModule().setMessage(_this8.openAudioMc.getMessages().welcomeMessage), e.getUserInterfaceModule().showVolumeSlider(!0), e.socketModule.state = "ok";
      }), this.socket.on("time-update", function (e) {
        var t = e.split(":"),
            s = parseInt(t[1]),
            n = parseInt(t[0]);_this8.openAudioMc.getTimeService().sync(n, s);
      }), this.socket.on("disconnect", function () {
        e.debugPrint("closed");
        var _loop = function _loop(_t) {
          e.getMediaManager().sounds[_t].setVolume(0, 1e3), setTimeout(function () {
            e.getMediaManager().sounds[_t].destroy();
          }, 1005);
        };

        for (var _t in e.getMediaManager().sounds) {
          _loop(_t);
        }e.getUserInterfaceModule().showVolumeSlider(!0), e.getUserInterfaceModule().setMessage(_this8.openAudioMc.getMessages().errorMessage), n.state = "closed", setTimeout(function () {
          e.getMediaManager().sounds = {};
        }, 1010);
      }), this.socket.on("data", function (e) {
        null != n.handlers[e.type] && n.handlers[e.type](e.payload);
      }), this.socket.connect();
    }

    a.prototype.registerHandler = function registerHandler(e, t) {
      this.handlers[e] = t;
    };

    return a;
  }();

  var d = function () {
    function d(e, t, s) {
      _classCallCheck(this, d);

      this._source = e, this.meta = {}, this.openAudioMc = t, this.time = 0, this.task = 0, this.onFinishHandlers = [], this.isLoading = !1, this.isPlayable = !1, this.isFading = !1, this.isFirstRun = !0, this.volume = this.openAudioMc.getMediaManager().getMasterVolume(), this.hasCustomVolume = !1, this.flag = "DEFAULT";var n = this;this.soundElement = document.createElement("audio"), this.soundElement.src = this._source, this.soundElement.setAttribute("preload", "auto"), this.soundElement.setAttribute("controls", "none"), this.soundElement.setAttribute("display", "none"), this.soundElement.oncanplay = function () {
        n.isPlayable = !0, n.isLoading = !0, n.isFirstRun && (n.isFirstRun = !1, null != s && s());
      }, this.soundElement.oncanplaythrough = function () {
        n.isLoading = !1;
      }, this.soundElement.onended = function () {
        n.isPlayable = !0, n.onFinishHandlers.forEach(function (e) {
          return e();
        });
      }, this.soundElement.onloadstart = function () {
        n.isLoading = !0;
      }, this.soundElement.ontimeupdate = function () {
        null != n.soundElement && (n.time = n.soundElement.currentTime);
      };
    }

    d.prototype.setTime = function setTime(e) {
      this.soundElement.currentTime = e;
    };

    d.prototype.getTime = function getTime() {
      return this.soundElement.currentTime;
    };

    d.prototype.setMasterVolume = function setMasterVolume(e) {
      this.hasCustomVolume || (this.isFading && clearInterval(this.task), this.setVolume(e));
    };

    d.prototype.onFinish = function onFinish(e) {
      this.onFinishHandlers.push(e);
    };

    d.prototype.setVolume = function setVolume(e, t, s) {
      if (null == t) return void (this.soundElement.volume = e / 100);this.isFading && clearInterval(this.task);var n = e - 100 * this.soundElement.volume;var i = 0;null == t && (t = 0);var o = t / (i = n < 0 ? Math.abs(n) : n),
          r = this,
          u = s;this.isFading = !0, this.task = setInterval(function () {
        function t() {
          r.isFading = !1, null != u && u(), clearInterval(r.task);
        }null != r.soundElement && e !== Math.floor(100 * r.soundElement.volume) ? n > 0 ? r.soundElement.volume = Math.ceil(100 * r.soundElement.volume + 1) / 100 : n < 0 ? r.soundElement.volume = Math.floor(100 * r.soundElement.volume - 1) / 100 : t() : t();
      }, o);
    };

    d.prototype.startDate = function startDate(e, t) {
      var s = new Date(e),
          n = Math.abs((s.getTime() - this.openAudioMc.getTimeService().getPredictedTime().getTime()) / 1e3),
          i = this.soundElement.duration;if (n > i) {
        if (!t) return;n -= Math.floor(n / i) * i;
      }this.setTime(n);
    };

    d.prototype.pause = function pause() {
      this.soundElement.pause();
    };

    d.prototype.destroy = function destroy() {
      this.pause(), this.soundElement.remove(), this.soundElement = null;
    };

    d.prototype.play = function play() {
      this.isPlayable ? this.soundElement.play() : console.error("Media could not start.");
    };

    d.prototype.hasOwnVolume = function hasOwnVolume() {
      return this.hasCustomVolume;
    };

    d.prototype.setFlag = function setFlag(e) {
      this.flag = e;
    };

    d.prototype.getFlag = function getFlag() {
      return this.flag;
    };

    d.prototype.setHasOwnVolume = function setHasOwnVolume(e) {
      this.hasCustomVolume = e;
    };

    d.prototype.setLooping = function setLooping(e) {
      this.soundElement.loop = e;
    };

    return d;
  }();

  var c = function c(e) {
    var _this9 = this;

    _classCallCheck(this, c);

    this.openAudioMc = e, e.socketModule.registerHandler("ClientCreateMediaPayload", function (t) {
      var s = t.media.loop,
          n = t.media.startInstant,
          i = t.media.mediaId,
          o = t.media.source,
          r = t.media.doPickup,
          u = t.media.fadeTime,
          a = t.distance,
          c = t.media.flag,
          h = t.maxDistance;var g = void 0,
          m = e.getMediaManager().getMasterVolume();g = new d(o, e, function () {
        e.getMediaManager().registerMedia(i, g), g.setMasterVolume(e.getMediaManager().getMasterVolume()), 0 !== h ? (m = l.calculateVolume(h - a, h), g.setHasOwnVolume(!0)) : g.setHasOwnVolume(!1), g.setFlag(c), 0 === u ? g.setVolume(m) : (g.setVolume(0), g.setVolume(m, u)), g.setLooping(s), r && g.startDate(n, s), g.play();
      });
    }), e.socketModule.registerHandler("ClientSettingsPayload", function (t) {
      e.debugPrint("Updating settings...");var s = t.clientSettings,
          n = s.background,
          i = s.title,
          o = s.welcomeMessage,
          r = s.errorMessage,
          u = s.hueConnected,
          l = s.hueLinking,
          a = s.hueBridgeFound;"default" !== u && (e.getMessages().hueConnected = u), "default" !== l && (e.getMessages().hueLinking = l), "default" !== a && (e.getMessages().hueWelcome = a), "default" !== r && (e.getMessages().errorMessage = r), "default" !== o && (e.getMessages().welcomeMessage = o), "default" !== n && (document.getElementById("page").style = "vertical-align: middle;\n    background:\n            linear-gradient(\n                    rgba(98, 90, 238, 0.45),\n                    rgba(98, 90, 238, 0.25)\n            ),\n            url(" + n + ");\n    font-family: 'Roboto', serif;\n    -webkit-background-size: cover;\n    background-size: cover;"), "default" !== i && (document.title = i), e.getMessages().apply();
    }), e.socketModule.registerHandler("ClientVolumePayload", function (e) {
      var t = e.volume;_this9.openAudioMc.getMediaManager().setMasterVolume(t), document.getElementById("volume-slider").value = t;
    }), e.socketModule.registerHandler("ClientDestroyMediaPayload", function (e) {
      _this9.openAudioMc.getMediaManager().destroySounds(e.soundId);
    }), e.socketModule.registerHandler("HueColorPayload", function (t) {
      var s = t.lights,
          n = t.hueColor,
          i = "rgba(" + n.r + "," + n.g + "," + n.b + "," + function (e, t, s) {
        return (e - t[0]) * (s[1] - s[0]) / (t[1] - t[0]) + s[0];
      }(n.bir, [0, 255], [0, 1]) + ")";e.getHueModule().isLinked && e.getHueModule().setLight(s, i);
    }), e.socketModule.registerHandler("ClientUpdateMediaPayload", function (t) {
      var s = t.mediaOptions.target,
          n = t.mediaOptions.fadeTime,
          i = t.mediaOptions.distance,
          o = t.mediaOptions.maxDistance,
          r = e.getMediaManager().getSound(s);null != r && r.setVolume(l.calculateVolume(o - i, o), n);
    });
  };

  console.log("%c Take note! this is a bundled version of OpenAudioMc. To get the full source code, please visit https://github.com/Mindgamesnl/OpenAudioMc", ["background: linear-gradient(#D33106, #571402)", "border: 1px solid #3E0E02", "color: white", "display: block", "text-shadow: 0 1px 0 rgba(0, 0, 0, 0.3)", "box-shadow: 0 1px 0 rgba(255, 255, 255, 0.4) inset, 0 5px 3px -5px rgba(0, 0, 0, 0.5), 0 -13px 5px -10px rgba(255, 255, 255, 0.4) inset", "line-height: 40px", "text-align: center", "font-weight: bold"].join(";"));
  var h = function () {
    function h() {
      _classCallCheck(this, h);

      var e = { userid: Cookies.get("hueid"), group: Cookies.get("huegroup") };this.log("Enabling the web client for " + window.navigator.userAgent), this.debugPrint("starting."), this.timeService = new n(), this.messages = new i(this), this.userInterfaceModule = new o(this), this.hueModule = new r(this, e), this.mediaManager = new u(this), this.socketModule = new a(this, "https://craftmendserver.eu"), new c(this), this.messages.apply();
    }

    h.prototype.log = function log(e) {
      console.log("[OpenAudioMc] " + e);
    };

    h.prototype.getMessages = function getMessages() {
      return this.messages;
    };

    h.prototype.getTimeService = function getTimeService() {
      return this.timeService;
    };

    h.prototype.debugPrint = function debugPrint(e) {
      this.log(e);
    };

    h.prototype.getMediaManager = function getMediaManager() {
      return this.mediaManager;
    };

    h.prototype.getHueModule = function getHueModule() {
      return this.hueModule;
    };

    h.prototype.getUserInterfaceModule = function getUserInterfaceModule() {
      return this.userInterfaceModule;
    };

    return h;
  }();

  var g = null;document.getElementById("start-button").onclick = function () {
    return void (null == g && (g = new h()));
  };
}]);

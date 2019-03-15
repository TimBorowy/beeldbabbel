
let selfEasyrtcid = ""


function connect() {
    easyrtc.setVideoDims(1280, 720)
    easyrtc.enableDebug(true)
    easyrtc.setRoomOccupantListener(convertListToButtons)
    easyrtc.easyApp("easyrtc.videoChatHd", "selfVideo", ["callerVideo"], loginSuccess, loginFailure)
}

function clearConnectList() {
    let otherClientDiv = document.getElementById('otherClients')

    while (otherClientDiv.hasChildNodes()) {
        otherClientDiv.removeChild(otherClientDiv.lastChild)
    }
}

function convertListToButtons(roomName, data, isPrimary) {
    clearConnectList()
    let otherClientDiv = document.getElementById('otherClients')
    for (let easyrtcid in data) {
        let button = document.createElement('button')
        button.onclick = function (easyrtcid) {
            return function () {
                performCall(easyrtcid)
            }
        }(easyrtcid)

        let label = document.createTextNode(easyrtc.idToName(easyrtcid))
        button.appendChild(label)
        button.className = "callbutton"
        otherClientDiv.appendChild(button)
    }
}


function performCall(otherEasyrtcid) {
    easyrtc.hangupAll()
    let acceptedCB = function (accepted, caller) {
        if (!accepted) {
            easyrtc.showError("CALL-REJECTED", "Sorry, your call to " + easyrtc.idToName(caller) + " was rejected")
        }
    }
    let successCB = function () { }
    let failureCB = function () { }
    easyrtc.call(otherEasyrtcid, successCB, failureCB, acceptedCB)
}


function loginSuccess(easyrtcid) {
    selfEasyrtcid = easyrtcid
    document.getElementById("iam").innerHTML = "I am " + easyrtc.cleanId(easyrtcid)
}


function loginFailure(errorCode, message) {
    easyrtc.showError(errorCode, message)
}


// Sets calls so they are automatically accepted (this is default behaviour)
easyrtc.setAcceptChecker(function (caller, cb) {
    cb(true)
});

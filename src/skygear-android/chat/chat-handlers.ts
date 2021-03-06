declare var io: any, java: any;

export var GetCallback = io.skygear.plugins.chat.GetCallback;
export var LambdaCallback = io.skygear.skygear.LambdaResponseHandler;
export var SaveCallback = io.skygear.plugins.chat.SaveCallback;
export var Serializer = io.skygear.skygear.RecordSerializer;
export var GetMessagesCallback = io.skygear.plugins.chat.GetMessagesCallback;
export var ConversationSubscriptionCallback = io.skygear.plugins.chat.ConversationSubscriptionCallback;
export var UserSubscriptionCallback = io.skygear.plugins.chat.UserChannelSubscriptionCallback;

const createJson = (chatArray) => {
    try {
        let jsArray = [];
        let newArray = chatArray.toArray()
        for (let index = 0; index < newArray.length; index++) {
            jsArray.push(newArray[index]);
        }
        return jsArray
            .map(c => c.toJson())
            .map(c => JSON.parse(c));
    } catch {
        return JSON.parse(chatArray.toJson());
    }
}

export class SKYSaveCallback extends SaveCallback {
    worker: Worker = new Worker('../result-worker');

    onSuccess(object) {
        let result = JSON.parse(object.toJson());
        this.worker.postMessage({ result, error: null });
        return;
    }

    onFail(error) {
        try {
            let _id = error.getConversationId();
            this.worker.postMessage({ result: { _id }, error: null })
            return;
        } catch {
            let err = error.getMessage()
            this.worker.postMessage({ result: null, error: err });
            return;
        }
    }
}

export class SKYGetCallback extends GetCallback {
    worker: Worker = new Worker('../result-worker');

    onSuccess(object) {
        let result = JSON.parse(object.toJson());
        this.worker.postMessage({ result, error: null });
        return;
    }

    onGetCachedResult(object) {
        let result = JSON.parse(object.toJson());
        this.worker.postMessage({ result, error: null });
        return;
    }

    onFail(err) {
        let error = err.getMessage();
        console.log(error);
        this.worker.postMessage({ result: null, error });
        return;
    }
}

export class SKYGetCollectionCallback extends GetCallback {
    worker: Worker = new Worker('../result-worker');
    onSuccess(object) {
        let result = createJson(object);
        this.worker.postMessage({ result, error: null });
        return;
    }

    onGetCachedResult(object) {
        let result = createJson(object);
        this.worker.postMessage({ result, error: null });
        return;
    }

    onFail(err) {
        let error = err.getMessage();
        console.log(error);
        this.worker.postMessage({ result: null, error });
        return;
    }
}

export class SKYLambdaCallback extends LambdaCallback {
    worker: Worker = new Worker('../result-worker');

    onLambdaSuccess(object) {
        let result = JSON.parse(object.toJson());
        this.worker.postMessage({ result, error: null });
        return;
    }

    onLambdaFail(err) {
        let error = err.getMessage();
        this.worker.postMessage({ result: null, error });
        return;
    }
}

export class SKYGetMessagesCallback extends GetMessagesCallback {
    worker: Worker = new Worker('../result-worker');
    onSuccess(object) {
        let result = createJson(object);
        this.worker.postMessage({ result, error: null });
        return;
    }

    onGetCachedResult(object) {
        let result = createJson(object);
        this.worker.postMessage({ result, error: null });
        return;
    }

    onFail(err) {
        let error = err.getMessage();
        console.log(error);
        this.worker.postMessage({ result: null, error });
        return;
    }
}

enum EventTypes {
    EVENT_TYPE_CREATE = "create",
    EVENT_TYPE_UPDATE = "update",
    EVENT_TYPE_DELETE = "delete"
}


export class SKYConversationSubscription extends ConversationSubscriptionCallback {
    worker: Worker = new Worker("../result-worker");

    supportingEventTypes() {
        let array = Array.create(java.lang.String, 3)
        array[0] = EventTypes.EVENT_TYPE_CREATE;
        array[1] = EventTypes.EVENT_TYPE_DELETE;
        array[2] = EventTypes.EVENT_TYPE_UPDATE;
        return array;
    }

    notify(event: string, conversation: any) {
        let result = JSON.parse(conversation)
        this.worker.postMessage({ result, error: null })
        return;
    }
}

export class SKYUserSubscription extends UserSubscriptionCallback {
    worker: Worker = new Worker("../result-worker");

    supportingEventTypes() {
        let array = Array.create(java.lang.String, 3)
        array[0] = EventTypes.EVENT_TYPE_CREATE;
        array[1] = EventTypes.EVENT_TYPE_DELETE;
        array[2] = EventTypes.EVENT_TYPE_UPDATE;
        return array;
    }

    notify(_: string, data: any) {
        let result = JSON.parse(data)
        this.worker.postMessage({ result, error: null })
        return;
    }
}
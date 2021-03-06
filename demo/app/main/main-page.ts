import * as observable from 'tns-core-modules/data/observable';
import { Page } from 'tns-core-modules/ui/page';
import { skygearSdk } from '../sdk'

import {HelloWorldModel} from './main-view-model';


// Event handler for Page 'loaded' event attached in main-page.xml
export function pageLoaded(args: observable.EventData) {
    // Get the event sender
    let page = <Page>args.object;
    page.bindingContext = new HelloWorldModel(skygearSdk);
}


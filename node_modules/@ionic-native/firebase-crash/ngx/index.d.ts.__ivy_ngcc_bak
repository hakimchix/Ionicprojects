import { IonicNativePlugin } from '@ionic-native/core';
/**
 * @name FirebaseCrash
 * @description
 * This plugin brings crash reporting from Google Firebase to your Cordova project! Android and iOS supported.
 *
 * @usage
 * ```typescript
 * import { FirebaseCrash } from '@ionic-native/firebase-crash';
 *
 * constructor(private firebaseCrash: FirebaseCrash) { }
 *
 * ...
 *
 * this.firebaseCrash.setUserId('123456789');
 * this.firebaseCrash.log('message');
 * this.firebaseCrash.logError('non fatal exception');
 *
 * ```
 */
export declare class FirebaseCrash extends IonicNativePlugin {
    /**
     * Add logging that will be sent with your crash data in case of app crash.
     * https://firebase.google.com/docs/crashlytics/customize-crash-reports?authuser=0#add_custom_logs
     * @param {string} message
     * @return {Promise<any>}
     */
    log(message: string): Promise<any>;
    /**
     * Log non-fatal exceptions in addition to automatically reported app crashes.
     * https://firebase.google.com/docs/crashlytics/customize-crash-reports?authuser=0#log_non-fatal_exceptions
     * @param {string} message
     * @return {Promise<any>}
     */
    logError(message: string): Promise<any>;
    /**
     * Sets the user identifier property for crashlytics reporting.
     * https://firebase.google.com/docs/crashlytics/customize-crash-reports?authuser=0#set_user_ids
     * @param {string} userId value to set the userId
     * @returns {Promise<any>}
     */
    setUserId(userId: string): Promise<any>;
}

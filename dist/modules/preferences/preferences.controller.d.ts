import { PreferencesService } from './preferences.service';
export declare class PreferencesController {
    private preferencesService;
    constructor(preferencesService: PreferencesService);
    getUserPreferences(params: any): Promise<import("../../core/entities").Preferences[]>;
    getUserRecommendation(params: any): Promise<any[]>;
}

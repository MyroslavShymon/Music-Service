import { Controller, Get, Param } from '@nestjs/common';
import { PreferencesService } from './preferences.service';

@Controller('/preferences')
export class PreferencesController {
	constructor(private preferencesService: PreferencesService) {}

	@Get('/:id')
	getUserPreferences(@Param() params) {
		return this.preferencesService.getPreferencesByUserId(params.id);
	}
}

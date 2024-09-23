import i18n from "i18next";
import { initReactI18next } from "react-i18next/initReactI18next";
import * as library18n from "@Qinastha/pulse_library/src/i18n";

const additionalResources = {
	en: {
		translation: {
			"login.buttonText": "Log in",
			"thread.noMessages": "No messages in this thread",
			"thread.send": "Send",
			"thread.noThread":
				"No thread selected. Please select a thread from the list or create a new one with button",
			"thread.inputPlaceholder": "Type a question...",
			"threadsList.noThreads": "No threads found",
		},
	},
	ua: {
		translation: {
			"login.buttonText": "Увійти",
			"thread.noMessages": "Немає повідомлень у цьому треду",
			"thread.send": "Надіслати",
			"thread.noThread":
				"Не вибрано тред. Будь ласка, виберіть тред зі списку чи створіть новий кнопкою",
			"thread.inputPlaceholder": "Введіть питання...",
			"threadsList.noThreads": "Не знайдено тредів",
		},
	},
};

library18n.default.addResources(
	"en",
	"translation",
	additionalResources.en.translation,
);
library18n.default.addResources(
	"ua",
	"translation",
	additionalResources.ua.translation,
);

i18n.use(initReactI18next).init({
	resources: library18n.default.options.resources,
	lng: "en",
	fallbackLng: "en",
	interpolation: {
		escapeValue: false,
	},
});

export default i18n;

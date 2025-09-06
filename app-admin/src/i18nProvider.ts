import polyglotI18nProvider from 'ra-i18n-polyglot';
import spanishMessages from './spanishMessages';

export const i18nProviderNoLocale = polyglotI18nProvider(
    locale => spanishMessages, 'es'
);
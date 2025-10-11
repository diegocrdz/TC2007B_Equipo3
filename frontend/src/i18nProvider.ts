/*
Proveedor de internacionalización (i18n) para react-admin
Usa mensajes en español
Fecha: 11/08/2025
*/

import polyglotI18nProvider from 'ra-i18n-polyglot';
import spanishMessages from './spanishMessages';

export const i18nProviderNoLocale = polyglotI18nProvider(
    locale => spanishMessages, 'es'
);
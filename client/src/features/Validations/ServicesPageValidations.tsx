import { useTranslation } from "react-i18next";
import { object, string } from "yup";

export function ServiceFormSchema() {
    const { t } = useTranslation();
    return object({
        Description: string().required(t("fieldIsMandatory")),
        name: string().required(t("fieldIsMandatory")),
        Price: string().required(t("fieldIsMandatory")).test('is-decimal', t('fieldCanBeOnlyR2Precision'), value => /^\d*\.{0,1}\d{0,2}$/.test(value)),
    })
}
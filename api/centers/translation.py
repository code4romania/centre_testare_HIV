from modeltranslation.translator import TranslationOptions, translator

from .models import CenterTestTypes, CenterType, NecessaryDocuments, FreeTestingConditions


class CommonCenterModelTranslationOptions(TranslationOptions):
    fields = ("name",)


translator.register(CenterType, CommonCenterModelTranslationOptions)
translator.register(CenterTestTypes, CommonCenterModelTranslationOptions)
translator.register(NecessaryDocuments, CommonCenterModelTranslationOptions)
translator.register(FreeTestingConditions, CommonCenterModelTranslationOptions)

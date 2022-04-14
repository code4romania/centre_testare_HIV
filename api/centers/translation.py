from modeltranslation.translator import TranslationOptions, translator

from .models import CenterRatingQuestions, CenterTestTypes, CenterType, FreeTestingConditions, NecessaryDocuments


class CommonCenterModelTranslationOptions(TranslationOptions):
    fields = ("name",)


class CenterRatingQuestionsTranslationOptions(TranslationOptions):
    fields = ("question",)


translator.register(CenterType, CommonCenterModelTranslationOptions)
translator.register(CenterTestTypes, CommonCenterModelTranslationOptions)
translator.register(NecessaryDocuments, CommonCenterModelTranslationOptions)
translator.register(FreeTestingConditions, CommonCenterModelTranslationOptions)
translator.register(CenterRatingQuestions, CenterRatingQuestionsTranslationOptions)

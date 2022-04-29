from modeltranslation.translator import TranslationOptions, translator

from blog.models import Post


class BlogTranslationOptions(TranslationOptions):
    fields = ("text", "title", "preview_text")


translator.register(Post, BlogTranslationOptions)

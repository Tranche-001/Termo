from django.db import models
from django.core.validators import MinLengthValidator
# Create your models here.

class Word(models.Model):
    word = models.CharField(
        max_length=5,
        validators=[MinLengthValidator(5)],
        help_text="Must be exactly 5 characters."
    )
    
    def __str__(self):
        return self.word
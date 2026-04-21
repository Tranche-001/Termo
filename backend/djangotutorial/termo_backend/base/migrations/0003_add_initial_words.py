from django.db import migrations

def populate_words(apps, schema_editor):
    # We fetch the 'Word' model from the 'base' app
    Word = apps.get_model('base', 'Word')
    
    word_list = ["Mamao", "Melao", "Barro"]
    
    for w in word_list:
        # get_or_create prevents errors if you run this twice
        Word.objects.get_or_create(word=w)

def remove_words(apps, schema_editor):
    Word = apps.get_model('base', 'Word')
    Word.objects.filter(word__in=["Mamao", "Melao", "Barro"]).delete()

class Migration(migrations.Migration):

    dependencies = [
        ('base', '0001_initial'), # This must match your first migration file name
    ]

    operations = [
        # Run the 'populate_words' function on migrate, 
        # and 'remove_words' if you ever roll back (migrate zero)
        migrations.RunPython(populate_words, remove_words),
    ]
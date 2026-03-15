from rest_framework import serializers
from base.models import Word

class WordSerializer(serializers.ModelSerializer):
  
  id = serializers.CharField(read_only=True)
  
  class Meta:
    model = Word
    fields = '__all__'
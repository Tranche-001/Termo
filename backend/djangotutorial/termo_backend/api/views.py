#Django views are Python functions that take http requests 
# and return http response, like HTML documents.

from rest_framework.response import Response
from rest_framework.decorators import api_view
from base.models import Word
from .serializers import WordSerializer

@api_view(['GET'])
def getData(request):
    words = Word.objects.all()
    serializer = WordSerializer(words, many=True)
    return Response(serializer.data)
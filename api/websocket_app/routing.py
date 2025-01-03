from django.urls import re_path
from .consumers.main import GameConsumer

websocket_urlpatterns = [
    re_path(r"memoryrush/play/(?P<action>\w+)/(?P<room_name>\w+)", GameConsumer.as_asgi(), name="room"),
]
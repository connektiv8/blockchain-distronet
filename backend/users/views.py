'''
Copyright (c) 2025 Connektiv8 LLC
Apache License 2.0
-------------------------------------------------------------------------
File: c:\localdev\crypto\blockchain-distronet\backend\users\views.py
 
Author: Christian Bannard
Created: 2025-01-12
-------------------------------------------------------------------------
HISTORY:
Date      	By	Comments
----------	---	---------------------------------------------------------
2025-01-12	CEB	Initial file creation

'''


from rest_framework import viewsets, permissions
from .models import User
from .serializers import UserSerializer

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        if self.request.user.is_staff:
            return User.objects.all()
        return User.objects.filter(id=self.request.user.id)
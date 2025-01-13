'''
Copyright (c) 2025 Connektiv8 LLC
Apache License 2.0
-------------------------------------------------------------------------
File: c:\localdev\crypto\blockchain-distronet\backend\users\serializers.py
 
Author: Christian Bannard
Created: 2025-01-12
-------------------------------------------------------------------------
HISTORY:
Date      	By	Comments
----------	---	---------------------------------------------------------
2025-01-12	CEB	Initial file creation

'''


# users/serializers.py
from rest_framework import serializers
from .models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'wallet_address', 'is_verified')
        read_only_fields = ('is_verified',)
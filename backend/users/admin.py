'''
Copyright (c) 2025 Connektiv8 LLC
Apache License 2.0
-------------------------------------------------------------------------
File: c:\localdev\crypto\blockchain-distronet\backend\users\admin.py
 
Author: Christian Bannard
Created: 2025-01-12
-------------------------------------------------------------------------
HISTORY:
Date      	By	Comments
----------	---	---------------------------------------------------------
2025-01-12	CEB	Inital file creation

'''


from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User

@admin.register(User)
class CustomUserAdmin(UserAdmin):
    list_display = ('username', 'email', 'wallet_address', 'is_verified', 'is_staff')
    list_filter = ('is_verified', 'is_staff', 'is_superuser', 'groups')
    search_fields = ('username', 'email', 'wallet_address')
    ordering = ('-created_at',)
    
    fieldsets = UserAdmin.fieldsets + (
        ('Blockchain Info', {'fields': ('wallet_address', 'is_verified')}),
    )
    add_fieldsets = UserAdmin.add_fieldsets + (
        ('Blockchain Info', {'fields': ('wallet_address', 'is_verified')}),
    )
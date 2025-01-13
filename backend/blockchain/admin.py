'''
Copyright (c) 2025 Connektiv8 LLC
Apache License 2.0
-------------------------------------------------------------------------
File: c:\localdev\crypto\blockchain-distronet\backend\blockchain\admin.py
 
Author: Christian Bannard
Created: 2025-01-12
-------------------------------------------------------------------------
HISTORY:
Date      	By	Comments
----------	---	---------------------------------------------------------
2025-01-12	CEB	Initial file creation

'''


from django.contrib import admin
from django.utils.html import format_html
from django.urls import reverse
from django.db.models import Sum
from .models import (
    ContributorNFT,
    CodeContribution,
    ContributorLevel,
    ContributorMetrics,
    Distribution
)

@admin.register(ContributorNFT)
class ContributorNFTAdmin(admin.ModelAdmin):
    list_display = ('token_id', 'contributor', 'rarity', 'gin_value', 'created_at', 'view_on_marketplace')
    list_filter = ('rarity', 'created_at', 'is_redeemed')
    search_fields = ('token_id', 'contributor__username', 'contributor__wallet_address')
    readonly_fields = ('token_id', 'metadata_uri', 'created_at')
    
    def view_on_marketplace(self, obj):
        if obj.token_id:
            return format_html(
                '<a href="{}" target="_blank">View on OpenSea</a>',
                f'https://opensea.io/assets/{obj.token_id}'
            )
        return "-"
    view_on_marketplace.short_description = "Marketplace"

@admin.register(CodeContribution)
class CodeContributionAdmin(admin.ModelAdmin):
    list_display = ('contributor', 'contribution_date', 'impact_score', 
                   'reward_amount', 'status', 'view_on_github')
    list_filter = ('status', 'contribution_date')
    search_fields = ('contributor__username', 'pull_request_url', 'commit_hash')
    readonly_fields = ('impact_score', 'reward_amount', 'contribution_date')
    
    def view_on_github(self, obj):
        if obj.pull_request_url:
            return format_html(
                '<a href="{}" target="_blank">View PR</a>',
                obj.pull_request_url
            )
        return "-"
    view_on_github.short_description = "GitHub PR"

@admin.register(ContributorMetrics)
class ContributorMetricsAdmin(admin.ModelAdmin):
    list_display = ('contributor', 'total_contributions', 'total_impact_score',
                   'total_gin_earned', 'current_level', 'nfts_earned')
    list_filter = ('current_level',)
    search_fields = ('contributor__username',)
    readonly_fields = ('total_contributions', 'total_impact_score', 'total_gin_earned')

    def get_readonly_fields(self, request, obj=None):
        if obj:  # Editing existing object
            return self.readonly_fields + ('contributor',)
        return self.readonly_fields

@admin.register(Distribution)
class DistributionAdmin(admin.ModelAdmin):
    list_display = ('user', 'network', 'amount', 'status', 'created_at', 'view_transaction')
    list_filter = ('status', 'network', 'created_at')
    search_fields = ('user__username', 'tx_hash')
    readonly_fields = ('tx_hash', 'created_at', 'updated_at')
    
    def view_transaction(self, obj):
        if obj.tx_hash:
            return format_html(
                '<a href="{}" target="_blank">View TX</a>',
                f'https://etherscan.io/tx/{obj.tx_hash}'
            )
        return "-"
    view_transaction.short_description = "Transaction"

# Custom admin views for end users
from django.views.generic import TemplateView
from django.contrib.auth.mixins import LoginRequiredMixin

class ContributorDashboardView(LoginRequiredMixin, TemplateView):
    template_name = 'blockchain/contributor_dashboard.html'
    
    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        user = self.request.user
        
        # Get user's metrics
        metrics = ContributorMetrics.objects.get(contributor=user)
        
        # Get recent contributions
        recent_contributions = CodeContribution.objects.filter(
            contributor=user
        ).order_by('-contribution_date')[:5]
        
        # Get NFTs
        nfts = ContributorNFT.objects.filter(
            contributor=user
        ).order_by('-created_at')
        
        # Calculate earnings overview
        earnings = Distribution.objects.filter(user=user).aggregate(
            total_earned=Sum('amount'),
            total_distributed=Sum('amount', filter={'status': 'COMPLETED'})
        )
        
        context.update({
            'metrics': metrics,
            'recent_contributions': recent_contributions,
            'nfts': nfts,
            'earnings': earnings
        })
        return context

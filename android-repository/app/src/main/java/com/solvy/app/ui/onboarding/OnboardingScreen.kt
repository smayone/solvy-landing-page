package com.solvy.app.ui.onboarding

import androidx.compose.animation.AnimatedVisibility
import androidx.compose.foundation.ExperimentalFoundationApi
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.pager.HorizontalPager
import androidx.compose.foundation.pager.rememberPagerState
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import kotlinx.coroutines.launch

data class OnboardingPage(
    val title: String,
    val description: String,
    val interactiveContent: OnboardingInteractiveContent
)

sealed class OnboardingInteractiveContent {
    object WalletDemo : OnboardingInteractiveContent()
    object TransactionDemo : OnboardingInteractiveContent()
    object BlockchainExplorer : OnboardingInteractiveContent()
    object None : OnboardingInteractiveContent()
}

@OptIn(ExperimentalFoundationApi::class)
@Composable
fun OnboardingScreen(
    onFinishOnboarding: () -> Unit
) {
    val pages = listOf(
        OnboardingPage(
            title = "Welcome to SOLVY",
            description = "Your gateway to decentralized finance and blockchain technology.",
            interactiveContent = OnboardingInteractiveContent.None
        ),
        OnboardingPage(
            title = "Secure Wallet",
            description = "Learn how to securely store and manage your digital assets.",
            interactiveContent = OnboardingInteractiveContent.WalletDemo
        ),
        OnboardingPage(
            title = "Smart Transactions",
            description = "Experience the power of blockchain transactions.",
            interactiveContent = OnboardingInteractiveContent.TransactionDemo
        ),
        OnboardingPage(
            title = "Explore Blockchain",
            description = "Dive into the blockchain and understand how it works.",
            interactiveContent = OnboardingInteractiveContent.BlockchainExplorer
        )
    )

    val pagerState = rememberPagerState(pageCount = { pages.size })
    val coroutineScope = rememberCoroutineScope()

    Column(
        modifier = Modifier.fillMaxSize(),
        horizontalAlignment = Alignment.CenterHorizontally
    ) {
        HorizontalPager(
            state = pagerState,
            modifier = Modifier
                .fillMaxWidth()
                .weight(1f)
        ) { page ->
            OnboardingPageContent(
                page = pages[page],
                isLastPage = page == pages.size - 1,
                onNextPage = {
                    coroutineScope.launch {
                        pagerState.animateScrollToPage(page + 1)
                    }
                },
                onFinish = onFinishOnboarding
            )
        }

        Row(
            modifier = Modifier
                .padding(horizontal = 16.dp)
                .padding(bottom = 24.dp),
            horizontalArrangement = Arrangement.Center
        ) {
            repeat(pages.size) { iteration ->
                val color = if (pagerState.currentPage == iteration) {
                    MaterialTheme.colorScheme.primary
                } else {
                    MaterialTheme.colorScheme.onSurface.copy(alpha = 0.3f)
                }
                Box(
                    modifier = Modifier
                        .padding(4.dp)
                        .size(8.dp)
                ) {
                    Surface(
                        shape = MaterialTheme.shapes.small,
                        color = color,
                        modifier = Modifier.size(8.dp)
                    ) {}
                }
            }
        }
    }
}

@Composable
fun OnboardingPageContent(
    page: OnboardingPage,
    isLastPage: Boolean,
    onNextPage: () -> Unit,
    onFinish: () -> Unit
) {
    Column(
        modifier = Modifier
            .fillMaxSize()
            .padding(16.dp),
        horizontalAlignment = Alignment.CenterHorizontally,
        verticalArrangement = Arrangement.SpaceBetween
    ) {
        Column(
            horizontalAlignment = Alignment.CenterHorizontally
        ) {
            Text(
                text = page.title,
                style = MaterialTheme.typography.headlineMedium,
                textAlign = TextAlign.Center,
                modifier = Modifier.padding(top = 48.dp, bottom = 16.dp)
            )

            Text(
                text = page.description,
                style = MaterialTheme.typography.bodyLarge,
                textAlign = TextAlign.Center,
                modifier = Modifier.padding(horizontal = 24.dp)
            )
        }

        InteractiveContent(content = page.interactiveContent)

        Button(
            onClick = if (isLastPage) onFinish else onNextPage,
            modifier = Modifier
                .padding(24.dp)
                .height(48.dp)
                .fillMaxWidth()
        ) {
            Text(if (isLastPage) "Get Started" else "Next")
        }
    }
}

@Composable
fun InteractiveContent(content: OnboardingInteractiveContent) {
    Box(
        modifier = Modifier
            .fillMaxWidth()
            .height(300.dp),
        contentAlignment = Alignment.Center
    ) {
        when (content) {
            is OnboardingInteractiveContent.WalletDemo -> WalletDemoContent()
            is OnboardingInteractiveContent.TransactionDemo -> TransactionDemoContent()
            is OnboardingInteractiveContent.BlockchainExplorer -> BlockchainExplorerContent()
            is OnboardingInteractiveContent.None -> {}
        }
    }
}

@Composable
fun WalletDemoContent() {
    Text("Wallet Demo")
    // Interactive wallet demo to be implemented
}

@Composable
fun TransactionDemoContent() {
    Text("Transaction Demo")
    // Interactive transaction demo to be implemented
}

@Composable
fun BlockchainExplorerContent() {
    Text("Blockchain Explorer")
    // Interactive blockchain explorer to be implemented
}

import SwiftUI

struct OnboardingPage: Identifiable {
    let id = UUID()
    let title: String
    let description: String
    let imageName: String
    let interactiveContent: OnboardingInteractiveContent
}

enum OnboardingInteractiveContent {
    case walletDemo
    case transactionDemo
    case blockchainExplorer
    case none
}

struct OnboardingView: View {
    @State private var currentPage = 0
    @State private var showMainApp = false
    
    let pages: [OnboardingPage] = [
        OnboardingPage(
            title: "Welcome to SOLVY",
            description: "Your gateway to decentralized finance and blockchain technology.",
            imageName: "onboarding-welcome",
            interactiveContent: .none
        ),
        OnboardingPage(
            title: "Secure Wallet",
            description: "Learn how to securely store and manage your digital assets.",
            imageName: "onboarding-wallet",
            interactiveContent: .walletDemo
        ),
        OnboardingPage(
            title: "Smart Transactions",
            description: "Experience the power of blockchain transactions.",
            imageName: "onboarding-transaction",
            interactiveContent: .transactionDemo
        ),
        OnboardingPage(
            title: "Explore Blockchain",
            description: "Dive into the blockchain and understand how it works.",
            imageName: "onboarding-explorer",
            interactiveContent: .blockchainExplorer
        )
    ]
    
    var body: some View {
        if showMainApp {
            MainAppView()
        } else {
            TabView(selection: $currentPage) {
                ForEach(pages.indices, id: \.self) { index in
                    OnboardingPageView(
                        page: pages[index],
                        isLastPage: index == pages.count - 1,
                        onNextPage: nextPage,
                        onFinish: finishOnboarding
                    )
                    .tag(index)
                }
            }
            .tabViewStyle(.page)
            .indexViewStyle(.page(backgroundDisplayMode: .always))
        }
    }
    
    private func nextPage() {
        withAnimation {
            currentPage += 1
        }
    }
    
    private func finishOnboarding() {
        withAnimation {
            showMainApp = true
        }
    }
}

struct OnboardingPageView: View {
    let page: OnboardingPage
    let isLastPage: Bool
    let onNextPage: () -> Void
    let onFinish: () -> Void
    
    var body: some View {
        VStack(spacing: 20) {
            Text(page.title)
                .font(.title)
                .bold()
                .padding(.top, 50)
            
            Text(page.description)
                .font(.body)
                .multilineTextAlignment(.center)
                .padding(.horizontal)
            
            InteractiveContentView(content: page.interactiveContent)
                .frame(height: 300)
            
            Spacer()
            
            Button(action: isLastPage ? onFinish : onNextPage) {
                Text(isLastPage ? "Get Started" : "Next")
                    .font(.headline)
                    .foregroundColor(.white)
                    .frame(width: 200, height: 50)
                    .background(Color.blue)
                    .cornerRadius(25)
            }
            .padding(.bottom, 50)
        }
    }
}

struct InteractiveContentView: View {
    let content: OnboardingInteractiveContent
    
    var body: some View {
        switch content {
        case .walletDemo:
            WalletDemoView()
        case .transactionDemo:
            TransactionDemoView()
        case .blockchainExplorer:
            BlockchainExplorerView()
        case .none:
            EmptyView()
        }
    }
}

// Placeholder views for interactive content
struct WalletDemoView: View {
    var body: some View {
        Text("Wallet Demo")
            // Interactive wallet demo to be implemented
    }
}

struct TransactionDemoView: View {
    var body: some View {
        Text("Transaction Demo")
            // Interactive transaction demo to be implemented
    }
}

struct BlockchainExplorerView: View {
    var body: some View {
        Text("Blockchain Explorer")
            // Interactive blockchain explorer to be implemented
    }
}

struct MainAppView: View {
    var body: some View {
        Text("Main App")
            // Main app content to be implemented
    }
}

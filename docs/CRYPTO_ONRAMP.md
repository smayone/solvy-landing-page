# SOLVY Crypto Onramp Integration Guide

This guide explains how to implement the SOLVY crypto onramp across different platforms.

## Web Implementation
For web-based integration, refer to the official Stripe documentation:
https://docs.stripe.com/crypto/onramp/emeddable-onramp-guide

The web implementation is currently active in our codebase. See `client/src/components/payments/crypto-onramp.tsx` for the reference implementation.

## Mobile Implementation

### iOS
For iOS integration, use the Stripe iOS SDK:
https://stripe.dev/stripe-ios/documentation/stripe

Key implementation steps:
1. Install the Stripe iOS SDK
2. Configure the SDK with your publishable key
3. Implement the onramp session creation
4. Present the onramp UI

### Android
For Android integration, use the Stripe Android SDK:
https://stripe.dev/stripe-android/index.html

Key implementation steps:
1. Add the Stripe Android SDK dependency
2. Initialize the SDK
3. Create an onramp session
4. Launch the onramp activity

### React Native
For React Native implementation, use the Stripe React Native SDK:
https://stripe.dev/stripe-react-native/api-reference/index.html

The React Native implementation will allow us to maintain a single codebase for both iOS and Android.

## Backend Integration
The backend API endpoints for crypto onramp are implemented in `server/routes.ts`. The following endpoints are available:

- POST `/api/crypto/create-onramp-session`: Creates a new onramp session
- POST `/api/crypto/webhook`: Handles Stripe webhooks for completed transactions

## Security Considerations
1. Never expose your Stripe secret key
2. Always validate user input
3. Implement proper error handling
4. Use webhooks for reliable transaction tracking

## Testing
Before deploying to production:
1. Test the integration using Stripe's test mode
2. Verify webhook handling
3. Test error scenarios
4. Validate mobile deep linking (for iOS/Android)

## Further Resources
- [Stripe API Reference](https://stripe.com/docs/api)
- [Testing Guides](https://stripe.com/docs/testing)
- [Security Best Practices](https://stripe.com/docs/security)

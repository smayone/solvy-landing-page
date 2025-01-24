# SOLVY iOS Application

Native iOS client for the SOLVY Web3 financial platform. Built with SwiftUI and integrates seamlessly with the SOLVY ecosystem.

## Features

- Native iOS UI with SwiftUI
- Secure wallet integration
- Biometric authentication
- Push notifications
- Apple Pay integration
- Offline transaction support

## Requirements

- Xcode 15.0+
- iOS 15.0+
- Swift 5.9+
- CocoaPods or Swift Package Manager

## Setup

1. Clone the repository
2. Install dependencies:
```bash
pod install
```
Or using Swift Package Manager:
```bash
swift package resolve
```

3. Open `SOLVY.xcworkspace` in Xcode
4. Configure your development team and bundle identifier
5. Build and run

## Project Structure

```
SOLVY/
├── App/
│   ├── SOLVYApp.swift
│   └── AppDelegate.swift
├── Features/
│   ├── Authentication/
│   ├── Wallet/
│   ├── Payments/
│   └── Profile/
├── Core/
│   ├── Network/
│   ├── Storage/
│   └── Security/
├── UI/
│   ├── Components/
│   ├── Screens/
│   └── Styles/
└── Resources/
    ├── Assets.xcassets
    └── Info.plist
```

## Configuration

Create a `Config.xcconfig` file with your API settings:

```
API_BASE_URL = https://api.solvy.com
API_VERSION = v1
```

## Documentation

- [API Integration](docs/API.md)
- [Security Guidelines](docs/SECURITY.md)
- [UI Components](docs/UI.md)

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

MIT License - see LICENSE file for details

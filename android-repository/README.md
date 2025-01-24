# SOLVY Android Application

Native Android client for the SOLVY Web3 financial platform. Built with Kotlin and Jetpack Compose.

## Features

- Material Design 3 UI with Jetpack Compose
- Secure wallet integration
- Biometric authentication
- Push notifications
- Google Pay integration
- Offline transaction support

## Requirements

- Android Studio Electric Eel or newer
- Android SDK 33+
- Kotlin 1.9+
- Gradle 8.0+

## Setup

1. Clone the repository
2. Open in Android Studio
3. Sync Gradle files
4. Build and run

## Project Structure

```
app/
├── src/
│   ├── main/
│   │   ├── java/com/solvy/
│   │   │   ├── app/
│   │   │   ├── data/
│   │   │   ├── di/
│   │   │   ├── domain/
│   │   │   └── ui/
│   │   └── res/
│   └── test/
├── build.gradle.kts
└── proguard-rules.pro
```

## Architecture

- Clean Architecture with MVVM
- Jetpack Compose for UI
- Kotlin Coroutines & Flow
- Hilt for dependency injection
- Room for local storage
- Retrofit for network calls

## Configuration

Create a `local.properties` file with your API settings:

```properties
API_BASE_URL=https://api.solvy.com
API_VERSION=v1
```

## Documentation

- [API Integration](docs/API.md)
- [Architecture Overview](docs/ARCHITECTURE.md)
- [UI Components](docs/UI.md)

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

MIT License - see LICENSE file for details

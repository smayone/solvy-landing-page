// swift-tools-version:5.9
import PackageDescription

let package = Package(
    name: "SOLVY",
    platforms: [
        .iOS(.v15),
        .macOS(.v12)
    ],
    products: [
        .library(
            name: "SOLVY",
            targets: ["SOLVY"]),
    ],
    dependencies: [
        .package(url: "https://github.com/Alamofire/Alamofire.git", from: "5.8.1"),
        .package(url: "https://github.com/krzyzanowskim/CryptoSwift.git", from: "1.8.0"),
        .package(url: "https://github.com/apple/swift-crypto.git", from: "3.2.0"),
        .package(url: "https://github.com/SwiftyJSON/SwiftyJSON.git", from: "5.0.1")
    ],
    targets: [
        .target(
            name: "SOLVY",
            dependencies: [
                "Alamofire",
                "CryptoSwift",
                .product(name: "Crypto", package: "swift-crypto"),
                "SwiftyJSON"
            ],
            path: "Sources"
        ),
        .testTarget(
            name: "SOLVYTests",
            dependencies: ["SOLVY"],
            path: "Tests"
        )
    ]
)

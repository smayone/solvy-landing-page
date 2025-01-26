import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: {
      conceptualizations: {
        title: 'Conceptualizations & Terminology',
        subtitle: 'Understanding Our Ecosystem Components',
        decidey: {
          title: 'DECIDEY (dee-see-day)',
          description: 'Understanding Tech Revenue Tax Repatriation and Transparency',
          terms: {
            tax_repatriation: {
              title: 'Tax Repatriation',
              description: 'Process of returning corporate profits held overseas back to their country of origin for proper taxation and economic benefit'
            },
            transparency_monitoring: {
              title: 'Transparency Monitoring',
              description: 'Continuous tracking and reporting of corporate financial flows and tax obligations'
            },
            donation_management: {
              title: 'Donation Management',
              description: 'Transparent tracking and allocation of corporate donations and community investments'
            },
            privacy_compliance: {
              title: 'Privacy Compliance',
              description: 'Monitoring and reporting of corporate compliance with data privacy regulations and user rights'
            }
          }
        },
        solvy: {
          title: 'SOLVY',
          description: 'Cross-border Payment Solutions and Financial Tools',
          terms: {
            cross_border_payments: {
              title: 'Cross-border Payments',
              description: 'Secure and efficient international money transfer systems using blockchain technology'
            },
            remittance_system: {
              title: 'Decentralized Remittance',
              description: 'Peer-to-peer money transfer system reducing costs and intermediaries'
            },
            smart_contracts: {
              title: 'Smart Contracts',
              description: 'Self-executing contracts with predefined rules for automated financial transactions'
            },
            financial_tools: {
              title: 'Financial Tools',
              description: 'Comprehensive suite of instruments for managing international payments and settlements'
            }
          }
        },
        man: {
          title: 'MAN (Mandatory Audit Network)',
          description: 'Comprehensive Audit and Compliance Tracking System',
          terms: {
            transaction_monitoring: {
              title: 'Real-time Monitoring',
              description: 'Continuous tracking of financial transactions for compliance and transparency'
            },
            compliance_checks: {
              title: 'Automated Compliance',
              description: 'Systematic verification of transactions against regulatory requirements'
            },
            audit_trails: {
              title: 'Audit Trails',
              description: 'Immutable records of all financial activities and compliance checks'
            },
            access_control: {
              title: 'Access Control',
              description: 'Hierarchical system controlling data access and modification rights'
            }
          }
        },
        dao: {
          title: 'Understanding DAOs',
          subtitle: 'Core Concepts of Decentralized Autonomous Organizations',
          description: 'Educational overview of blockchain-based organizational structures',
          terms: {
            definition: {
              title: 'What is a DAO?',
              description: 'A Decentralized Autonomous Organization (DAO) is a blockchain-based structure where rules and decisions are governed by the community through transparent processes'
            },
            governance: {
              title: 'Governance Models',
              description: 'Different approaches to community-driven decision making and resource management in DAOs'
            },
            token_economics: {
              title: 'Token Economics',
              description: 'How tokens are used to align incentives and enable participation in DAOs'
            },
            member_rights: {
              title: 'Member Rights',
              description: 'Understanding the roles, responsibilities and privileges of DAO participants'
            }
          }
        }
      },
      hero: {
        title: 'SOLVY: Gain Financial Sovereignty',
        creator: 'Created by SA Nathan LLC',
        vulture_economy: 'Companies are profiting billions from your data, which they hold captive in their databases-and they\'re counting on you not realizing its worth. In a vulture economy, businesses circle around individual needs, profiting from vulnerabilities rather than fostering growth. But what if your finances were as resilient as a disaster recovery solution, and your data was protected like a vault?',
        solutions_valued: 'Solvy.chain: Solutions Valued You. A comprehensive Web3 financial ecosystem by SA Nathan LLC, breaking those chains, building a cooperative, DAO-driven future where trade and commerce are mutually beneficial and truly empower individuals.',
      },
      about: {
        creator: {
          title: 'SA Nathan LLC',
          role: 'Creator & Product Owner',
          description: 'SA Nathan LLC is the visionary creator and product owner behind the SOLVY ecosystem, including our Web3 financial platform, iOS and Android applications, and comprehensive blockchain education resources.'
        }
      },
      nav: {
        decidey: 'DECIDEY',
        solvy: 'SOLVY',
        man: 'MAN',
        connect_wallet: 'Connect Wallet',
        language: 'Language',
        evergreen: 'Evergreen Beauty',
        analytics: 'Analytics'
      },
      education: {
        dao: {
          title: 'Understanding DAOs',
          subtitle: 'Decentralized Autonomous Organizations Explained',
          description: 'Learn about the future of organizational governance through blockchain technology',
          concepts: {
            what_is_dao: {
              title: 'What is a DAO?',
              description: 'A Decentralized Autonomous Organization (DAO) is a blockchain-based structure where rules are encoded as transparent computer programs, reducing the need for central management.'
            },
            how_it_works: {
              title: 'How DAOs Work',
              description: 'DAOs operate through smart contracts that define rules and execute decisions automatically. Members can propose and vote on decisions that affect the organization.'
            },
            benefits: {
              title: 'Benefits of DAOs',
              description: 'DAOs offer transparency, reduced bureaucracy, and democratic decision-making. They enable global collaboration and automated execution of community decisions.'
            },
            use_cases: {
              title: 'DAO Use Cases',
              description: 'DAOs can be used for investment groups, charitable giving, project funding, and community-owned businesses, among other applications.'
            }
          }
        },
        welcome: {
          title: 'Welcome to SOLVY Education',
          subtitle: 'Your Journey into Blockchain Technology Starts Here',
          start_learning: 'Start Learning'
        },
        blockchain_basics: {
          title: 'Blockchain Fundamentals',
          chapters: {
            intro: 'Introduction to Blockchain',
            decentralization: 'Understanding Decentralization',
            consensus: 'Consensus Mechanisms',
            cryptography: 'Cryptography Basics',
            smart_contracts: 'Smart Contracts 101'
          },
          interactive: {
            demo_blockchain: 'Try Building a Block',
            validate_transaction: 'Validate a Transaction',
            create_wallet: 'Create Your First Wallet'
          }
        },
        learning_paths: {
          beginner: 'Beginner Path',
          intermediate: 'Intermediate Path',
          advanced: 'Advanced Path',
          expert: 'Expert Path'
        },
        progress: {
          completed: 'Completed',
          in_progress: 'In Progress',
          not_started: 'Not Started',
          certificate: 'View Certificate'
        }
      },
      evergreen: {
        title: 'Evergreen Beauty Lounge',
        subtitle: 'Experience luxury beauty services with the convenience of SOLVY payments.',
        book_now: 'Book Now with SOLVY',
        services: 'Services',
        gift_cards: 'Gift Cards',
        gift_card_bonus: 'Get ${bonus} bonus value!',
        total_value: 'Total Value',
        purchase_with_solvy: 'Purchase with SOLVY',
        book_appointment: 'Book Appointment',
        booking_success: 'Appointment booked!',
        booking_error: 'Failed to book appointment. Please try again.',
        gift_card_success: 'Gift card purchased successfully!',
        gift_card_error: 'Failed to purchase gift card. Please try again.',
      }
    }
  },
  es: {
    translation: {
      evergreen: {
        title: 'Salón de Belleza Evergreen',
        subtitle: 'Experimente servicios de belleza de lujo con la conveniencia de los pagos SOLVY.',
        book_now: 'Reserve Ahora con SOLVY',
        services: 'Servicios',
        gift_cards: 'Tarjetas de Regalo',
        gift_card_bonus: '¡Obtenga ${bonus} de valor adicional!',
        total_value: 'Valor Total',
        purchase_with_solvy: 'Comprar con SOLVY',
        book_appointment: 'Reservar Cita',
        booking_success: '¡Cita reservada!',
        booking_error: 'Error al reservar cita. Por favor, inténtelo de nuevo.',
        gift_card_success: '¡Tarjeta de regalo comprada con éxito!',
        gift_card_error: 'Error al comprar la tarjeta de regalo. Por favor, inténtelo de nuevo.',
      },
      nav: {
        decidey: 'DECIDEY',
        solvy: 'SOLVY',
        man: 'MAN',
        connect_wallet: 'Conectar Billetera',
        language: 'Idioma',
        evergreen: 'Belleza Evergreen',
        analytics: 'Análisis'
      },
      education: {
        welcome: {
          title: 'Bienvenido a SOLVY Education',
          subtitle: 'Tu viaje en la tecnología Blockchain comienza aquí',
          start_learning: 'Empezar a Aprender'
        },
        blockchain_basics: {
          title: 'Fundamentos de Blockchain',
          chapters: {
            intro: 'Introducción a Blockchain',
            decentralization: 'Entendiendo la Descentralización',
            consensus: 'Mecanismos de Consenso',
            cryptography: 'Fundamentos de Criptografía',
            smart_contracts: 'Contratos Inteligentes 101'
          },
          interactive: {
            demo_blockchain: 'Intenta Construir un Bloque',
            validate_transaction: 'Valida una Transacción',
            create_wallet: 'Crea Tu Primera Billetera'
          }
        },
        learning_paths: {
          beginner: 'Ruta Principiante',
          intermediate: 'Ruta Intermedia',
          advanced: 'Ruta Avanzada',
          expert: 'Ruta Experta'
        },
        progress: {
          completed: 'Completado',
          in_progress: 'En Progreso',
          not_started: 'No Iniciado',
          certificate: 'Ver Certificado'
        },
        dao: {
          title: 'Conceptos y Terminología de DAO',
          subtitle: 'Aprende sobre las Organizaciones Autónomas Descentralizadas',
          description: 'Descubre el futuro de la gobernanza organizacional a través de la tecnología blockchain',
          concepts: {
            what_is_dao: {
              title: '¿Qué es un DAO?',
              description: 'Una Organización Autónoma Descentralizada (DAO) es una estructura basada en blockchain donde las reglas están codificadas como programas informáticos transparentes, reduciendo la necesidad de gestión centralizada.'
            },
            how_it_works: {
              title: 'Cómo funcionan los DAOs',
              description: 'Los DAOs operan a través de contratos inteligentes que definen reglas y ejecutan decisiones automáticamente. Los miembros pueden proponer y votar sobre las decisiones que afectan a la organización.'
            },
            benefits: {
              title: 'Beneficios de los DAOs',
              description: 'Los DAOs ofrecen transparencia, burocracia reducida y toma de decisiones democrática. Permiten la colaboración global y la ejecución automatizada de decisiones comunitarias.'
            },
            use_cases: {
              title: 'Casos de uso de los DAOs',
              description: 'Los DAOs se pueden utilizar para grupos de inversión, donaciones benéficas, financiación de proyectos y empresas de propiedad comunitaria, entre otras aplicaciones.'
            }
          }
        }
      },
      concepts: {
        dao: {
          title: 'Conceptos y Terminología de DAO',
          description: 'Conceptos esenciales para entender las Organizaciones Autónomas Descentralizadas',
          terms: {
            governance: {
              title: 'Gobernanza',
              description: 'El sistema de reglas, prácticas y procesos por los cuales se dirige y controla un DAO'
            },
            token_economics: {
              title: 'Economía de Tokens',
              description: 'El sistema económico que gobierna la creación, distribución y gestión de tokens dentro de un DAO'
            },
            voting_mechanisms: {
              title: 'Mecanismos de Votación',
              description: 'Sistemas utilizados para tomar decisiones colectivas, incluyendo votación cuadrática y votación ponderada por tokens'
            },
            smart_contracts: {
              title: 'Contratos Inteligentes',
              description: 'Contratos autoejecutables con términos escritos directamente en código que automatizan las operaciones del DAO'
            },
            treasury: {
              title: 'Gestión de Tesorería',
              description: 'El manejo y asignación de fondos y recursos del DAO a través de la gobernanza comunitaria'
            }
          }
        }
      },
      hero: {
        creator: 'Creado por SA Nathan LLC'
      }
    }
  },
  vi: {
    translation: {
      evergreen: {
        title: 'Phòng Làm Đẹp Evergreen',
        subtitle: 'Trải nghiệm dịch vụ làm đẹp cao cấp với thanh toán tiện lợi qua SOLVY.',
        book_now: 'Đặt Lịch với SOLVY',
        services: 'Dịch Vụ',
        gift_cards: 'Thẻ Quà Tặng',
        gift_card_bonus: 'Nhận thêm ${bonus} giá trị!',
        total_value: 'Tổng Giá Trị',
        purchase_with_solvy: 'Mua với SOLVY',
        book_appointment: 'Đặt Lịch Hẹn',
        booking_success: 'Đã đặt lịch hẹn!',
        booking_error: 'Không thể đặt lịch hẹn. Vui lòng thử lại.',
        gift_card_success: 'Đã mua thẻ quà tặng thành công!',
        gift_card_error: 'Không thể mua thẻ quà tặng. Vui lòng thử lại.',
      },
      education: {
        welcome: {
          title: 'Chào mừng đến với SOLVY Education',
          subtitle: 'Hành trình của bạn vào Công nghệ Blockchain bắt đầu từ đây',
          start_learning: 'Bắt đầu Học'
        },
        blockchain_basics: {
          title: 'Nền tảng Blockchain',
          chapters: {
            intro: 'Giới thiệu về Blockchain',
            decentralization: 'Hiểu về Phân cấp',
            consensus: 'Cơ chế Đồng thuận',
            cryptography: 'Cơ bản về Mật mã học',
            smart_contracts: 'Hợp đồng Thông minh 101'
          },
          interactive: {
            demo_blockchain: 'Thử Xây dựng Block',
            validate_transaction: 'Xác thực Giao dịch',
            create_wallet: 'Tạo Ví đầu tiên'
          }
        },
        learning_paths: {
          beginner: 'Lộ trình Người mới',
          intermediate: 'Lộ trình Trung cấp',
          advanced: 'Lộ trình Nâng cao',
          expert: 'Lộ trình Chuyên gia'
        },
        progress: {
          completed: 'Đã hoàn thành',
          in_progress: 'Đang học',
          not_started: 'Chưa bắt đầu',
          certificate: 'Xem Chứng chỉ'
        },
        dao: {
          title: 'Khái Niệm và Thuật Ngữ DAO',
          subtitle: 'Tìm hiểu về các Tổ chức Tự trị Phi tập trung',
          description: 'Khám phá tương lai của quản trị tổ chức thông qua công nghệ chuỗi khối',
          concepts: {
            what_is_dao: {
              title: 'DAO là gì?',
              description: 'Tổ chức tự trị phi tập trung (DAO) là một cấu trúc dựa trên chuỗi khối, trong đó các quy tắc được mã hóa dưới dạng các chương trình máy tính minh bạch, làm giảm nhu cầu quản lý tập trung.'
            },
            how_it_works: {
              title: 'DAO hoạt động như thế nào?',
              description: 'DAO hoạt động thông qua các hợp đồng thông minh xác định các quy tắc và tự động thực thi các quyết định. Các thành viên có thể đề xuất và bỏ phiếu về các quyết định ảnh hưởng đến tổ chức.'
            },
            benefits: {
              title: 'Lợi ích của DAO',
              description: 'DAO mang lại tính minh bạch, giảm bớt quan liêu và ra quyết định dân chủ. Chúng cho phép hợp tác toàn cầu và tự động thực thi các quyết định của cộng đồng.'
            },
            use_cases: {
              title: 'Trường hợp sử dụng của DAO',
              description: 'DAO có thể được sử dụng cho các nhóm đầu tư, quyên góp từ thiện, tài trợ dự án và các doanh nghiệp thuộc sở hữu cộng đồng, trong số các ứng dụng khác.'
            }
          }
        }
      },
      concepts: {
        dao: {
          title: 'Khái Niệm và Thuật Ngữ DAO',
          description: 'Các khái niệm cơ bản để hiểu về Tổ Chức Tự Trị Phi Tập Trung',
          terms: {
            governance: {
              title: 'Quản Trị',
              description: 'Hệ thống quy tắc, thực hành và quy trình điều hành và kiểm soát DAO'
            },
            token_economics: {
              title: 'Kinh Tế Token',
              description: 'Hệ thống kinh tế điều chỉnh việc tạo, phân phối và quản lý token trong DAO'
            },
            voting_mechanisms: {
              title: 'Cơ Chế Bỏ Phiếu',
              description: 'Hệ thống được sử dụng để ra quyết định tập thể, bao gồm bỏ phiếu bậc hai và bỏ phiếu theo trọng số token'
            },
            smart_contracts: {
              title: 'Hợp Đồng Thông Minh',
              description: 'Hợp đồng tự thực thi với các điều khoản được viết trực tiếp thành mã để tự động hóa hoạt động DAO'
            },
            treasury: {
              title: 'Quản Lý Kho Bạc',
              description: 'Việc xử lý và phân bổ quỹ và tài nguyên DAO thông qua quản trị cộng đồng'
            }
          }
        }
      },
      nav: {
        decidey: 'DECIDEY',
        solvy: 'SOLVY',
        man: 'MAN',
        connect_wallet: 'Kết nối ví',
        language: 'Ngôn ngữ',
        evergreen: 'Evergreen Beauty',
        analytics: 'Phân tích'
      },
      hero: {
        creator: 'Được tạo bởi SA Nathan LLC'
      }
    }
  },
  zh: {
    translation: {
      evergreen: {
        title: '常青美容院',
        subtitle: '体验豪华美容服务，享受SOLVY支付的便利。',
        book_now: '立即用SOLVY预约',
        services: '服务项目',
        gift_cards: '礼品卡',
        gift_card_bonus: '获得${bonus}额外价值！',
        total_value: '总价值',
        purchase_with_solvy: '用SOLVY购买',
        book_appointment: '预约',
        booking_success: '预约成功！',
        booking_error: '预约失败。请重试。',
        gift_card_success: '礼品卡购买成功！',
        gift_card_error: '礼品卡购买失败。请重试。',
      },
      education: {
        welcome: {
          title: 'SOLVY教育欢迎您',
          subtitle: '您的区块链技术之旅从这里开始',
          start_learning: '开始学习'
        },
        blockchain_basics: {
          title: '区块链基础',
          chapters: {
            intro: '区块链简介',
            decentralization: '理解去中心化',
            consensus: '共识机制',
            cryptography: '密码学基础',
            smart_contracts: '智能合约101'
          },
          interactive: {
            demo_blockchain: '尝试构建区块',
            validate_transaction: '验证交易',
            create_wallet: '创建首个钱包'
          }
        },
        learning_paths: {
          beginner: '初学者路径',
          intermediate: '中级路径',
          advanced: '高级路径',
          expert: '专家路径'
        },
        progress: {
          completed: '已完成',
          in_progress: '进行中',
          not_started: '未开始',
          certificate: '查看证书'
        },
        dao: {
          title: '去中心化自治组织概念和术语',
          subtitle: '学习去中心化自治组织',
          description: '通过区块链技术探索组织治理的未来',
          concepts: {
            what_is_dao: {
              title: '什么是DAO？',
              description: '去中心化自治组织 (DAO) 是一种基于区块链的结构，其规则被编码为透明的计算机程序，从而减少了对中心化管理的需求。'
            },
            how_it_works: {
              title: 'DAO 如何运作？',
              description: 'DAO 通过定义规则并自动执行决策的智能合约运行。成员可以提出并投票决定影响组织的决策。'
            },
            benefits: {
              title: 'DAO 的好处',
              description: 'DAO 提供透明度、减少官僚主义和民主决策。它们能够实现全球协作和社区决策的自动化执行。'
            },
            use_cases: {
              title: 'DAO 的用例',
              description: 'DAO 可用于投资集团、慈善捐赠、项目资金和社区所有制企业等应用。'
            }
          }
        }
      },
      concepts: {
        dao: {
          title: '去中心化自治组织概念和术语',
          description: '理解去中心化自治组织 (DAO) 的基本概念',
          terms: {
            governance: {
              title: '治理',
              description: 'DAO 的指导和控制规则、实践和流程体系'
            },
            token_economics: {
              title: '代币经济学',
              description: '管理 DAO 中代币创建、分配和管理的经济系统'
            },
            voting_mechanisms: {
              title: '投票机制',
              description: '用于集体决策的系统，包括二次投票和代币加权投票'
            },
            smart_contracts: {
              title: '智能合约',
              description: '条款直接写入代码中的自执行合约，用于自动化 DAO 操作'
            },
            treasury: {
              title: '国库管理',
              description: '通过社区治理处理和分配 DAO 资金和资源'
            }
          }
        }
      },
      nav: {
        decidey: 'DECIDEY',
        solvy: 'SOLVY',
        man: 'MAN',
        connect_wallet: '连接钱包',
        language: '语言',
        evergreen: '常青美容',
        analytics: '分析'
      },
      hero: {
        creator: '由 SA Nathan LLC 创建'
      }
    }
  },
  ko: {
    translation: {
      evergreen: {
        title: '에버그린 뷰티 라운지',
        subtitle: 'SOLVY 결제의 편리함과 함께 럭셔리 뷰티 서비스를 경험하세요.',
        book_now: 'SOLVY로 지금 예약',
        services: '서비스',
        gift_cards: '기프트 카드',
        gift_card_bonus: '${bonus} 보너스 가치 받기!',
        total_value: '총 가치',
        purchase_with_solvy: 'SOLVY로 구매',
        book_appointment: '예약하기',
        booking_success: '예약이 완료되었습니다!',
        booking_error: '예약에 실패했습니다. 다시 시도해주세요.',
        gift_card_success: '기프트 카드 구매가 완료되었습니다!',
        gift_card_error: '기프트 카드 구매에 실패했습니다. 다시 시도해주세요.',
      },
      education: {
        welcome: {
          title: 'SOLVY 교육에 오신 것을 환영합니다',
          subtitle: '블록체인 기술 여정이 여기서 시작됩니다',
          start_learning: '학습 시작'
        },
        blockchain_basics: {
          title: '블록체인 기초',
          chapters: {
            intro: '블록체인 소개',
            decentralization: '탈중앙화의 이해',
            consensus: '합의 메커니즘',
            cryptography: '암호학 기초',
            smart_contracts: '스마트 컨트랙트 101'
          },
          interactive: {
            demo_blockchain: '블록 만들어보기',
            validate_transaction: '거래 검증하기',
            create_wallet: '첫 지갑 만들기'
          }
        },
        learning_paths: {
          beginner: '초보자 과정',
          intermediate: '중급자 과정',
          advanced: '고급자 과정',
          expert: '전문가 과정'
        },
        progress: {
          completed: '완료됨',
          in_progress: '진행 중',
          not_started: '시작되지 않음',
          certificate: '수료증 보기'
        },
        dao: {
          title: '탈중앙화 자율 조직 개념 및 용어',
          subtitle: '탈중앙화 자율 조직에 대해 알아보세요',
          description: '블록체인 기술을 통한 조직 거버넌스의 미래를 배워보세요.',
          concepts: {
            what_is_dao: {
              title: 'DAO란 무엇입니까?',
              description: '탈중앙화 자율 조직(DAO)은 규칙이 투명한 컴퓨터 프로그램으로 코딩되어 중앙 관리의 필요성을 줄이는 블록체인 기반 구조입니다.'
            },
            how_it_works: {
              title: 'DAO는 어떻게 작동합니까?',
              description: 'DAO는 규칙을 정의하고 결정을 자동으로 실행하는 스마트 계약을 통해 작동합니다. 구성원은 조직에 영향을 미치는 결정에 대해 제안하고 투표할 수 있습니다.'
            },
            benefits: {
              title: 'DAO의 이점',
              description: 'DAO는 투명성, 관료주의 감소 및 민주적 의사결정을 제공합니다. 전 세계적인 협업과 커뮤니티 결정의 자동화된 실행을 가능하게 합니다.'
            },
            use_cases: {
              title: 'DAO의 사용 사례',
              description: 'DAO는 투자 그룹, 자선 기부, 프로젝트 자금 조달 및 커뮤니티 소유 기업 등 다양한 용도로 사용할 수 있습니다.'
            }
          }
        }
      },
      concepts: {
        dao: {
          title: '탈중앙화 자율 조직 개념 및 용어',
          description: '탈중앙화 자율 조직 이해를 위한 필수 개념',
          terms: {
            governance: {
              title: '거버넌스',
              description: 'DAO의 운영 및 관리를 위한 규칙, 관행 및 절차 시스템'
            },
            token_economics: {
              title: '토큰 경제',
              description: 'DAO 내에서 토큰 생성, 분배 및 관리를 관장하는 경제 시스템'
            },
            voting_mechanisms: {
              title: '투표 메커니즘',
              description: '집단적 의사결정에 사용되는 시스템(예: 이차 투표 및 토큰 가중치 투표)'
            },
            smart_contracts: {
              title: '스마트 컨트랙트',
              description: 'DAO 운영을 자동화하는 코드에 직접 작성된 조건이 포함된 자체 실행 계약'
            },
            treasury: {
              title: '재무 관리',
              description: '커뮤니티 거버넌스를 통해 DAO 자금 및 자원을 관리 및 할당하는 것'
            }
          }
        }
      },
      nav: {
        decidey: 'DECIDEY',
        solvy: 'SOLVY',
        man: 'MAN',
        connect_wallet: '지갑 연결',
        language: '언어',
        evergreen: '에버그린 뷰티',
        analytics: '분석'
      },
      hero: {
        creator: 'SA Nathan LLC에서 제작'
      }
    }
  },
  "es-MX": {
    translation: {
      evergreen: {
        title: 'Salón de Belleza Evergreen',
        subtitle: 'Experimente servicios de belleza de lujo con la conveniencia de los pagos SOLVY.',
        book_now: 'Reserve Ahora con SOLVY',
        services: 'Servicios',
        gift_cards: 'Tarjetas de Regalo',
        gift_card_bonus: '¡Obtenga ${bonus} de valor adicional!',
        total_value: 'Valor Total',
        purchase_with_solvy: 'Comprar con SOLVY',
        book_appointment: 'Reservar Cita',
        booking_success: '¡Cita reservada!',
        booking_error: 'Error al reservar cita. Por favor, inténtelo de nuevo.',
        gift_card_success: '¡Tarjeta de regalo comprada con éxito!',
        gift_card_error: 'Error al comprar la tarjeta de regalo. Por favor, inténtelo de nuevo.',
      }
    }
  },
  "es-PR": {
    translation: {
      evergreen: {
        title: 'Salón de Belleza Evergreen',
        subtitle: 'Experimente servicios de belleza de lujo con la conveniencia de los pagos SOLVY.',
        book_now: 'Reserve Ahora con SOLVY',
        services: 'Servicios',
        gift_cards: 'Tarjetas de Regalo',
        gift_card_bonus: '¡Obtenga ${bonus} de valor adicional!',
        total_value: 'Valor Total',
        purchase_with_solvy: 'Comprar con SOLVY',
        book_appointment: 'Reservar Cita',
        booking_success: '¡Cita reservada!',
        booking_error: 'Error al reservar cita. Por favor, inténtelo de nuevo.',
        gift_card_success: '¡Tarjeta de regalo comprada con éxito!',
        gift_card_error: 'Error al comprar la tarjeta de regalo. Por favor, inténtelo de nuevo.',
      }
    }
  },
  "es-DO": {
    translation: {
      evergreen: {
        title: 'Salón de Belleza Evergreen',
        subtitle: 'Experimente servicios de belleza de lujo con la conveniencia de los pagos SOLVY.',
        book_now: 'Reserve Ahora con SOLVY',
        services: 'Servicios',
        gift_cards: 'Tarjetas de Regalo',
        gift_card_bonus: '¡Obtenga ${bonus} de valor adicional!',
        total_value: 'Valor Total',
        purchase_with_solvy: 'Comprar con SOLVY',
        book_appointment: 'Reservar Cita',
        booking_success: '¡Cita reservada!',
        booking_error: 'Error al reservar cita. Por favor, inténtelo de nuevo.',
        gift_card_success: '¡Tarjeta de regalo comprada con éxito!',
        gift_card_error: 'Error al comprar la tarjeta de regalo. Por favor, inténtelo de nuevo.',
      }
    }
  },
  tl: {
    translation: {
      evergreen: {
        title: 'Evergreen Beauty Lounge',
        subtitle: 'Maranasan ang mga serbisyong pagpapaganda na may kaginhawaan ng SOLVY payments.',
        book_now: 'Mag-book Gamit ang SOLVY',
        services: 'Mga Serbisyo',
        gift_cards: 'Gift Cards',
        gift_card_bonus: 'Get ${bonus} bonus value!',
        total_value: 'Total Value',
        purchase_with_solvy: 'Purchase with SOLVY',
        book_appointment: 'Book Appointment',
        booking_success: 'Appointment booked!',
        booking_error: 'Failed to book appointment. Please try again.',
        gift_card_success: 'Gift card purchased successfully!',
        gift_card_error: 'Failed to purchase gift card. Please try again.',
      }
    }
  },
  ja: {
    translation: {
      evergreen: {
        title: 'エバーグリーン・ビューティーラウンジ',
        subtitle: 'SOLVYペイメントの利便性で高級美容サービスを体験',
        book_now: 'SOLVYで予約',
        services: 'サービス',
        gift_cards: 'ギフトカード',
        gift_card_bonus: 'Get ${bonus} bonus value!',
        total_value: 'Total Value',
        purchase_with_solvy: 'Purchase with SOLVY',
        book_appointment: 'Book Appointment',
        booking_success: 'Appointment booked!',
        booking_error: 'Failed to book appointment. Please try again.',
        gift_card_success: 'Gift card purchased successfully!',
        gift_card_error: 'Failed to purchase gift card. Please try again.',
      }
    }
  },
  th: {
    translation: {
      evergreen: {
        title: 'เอเวอร์กรีน บิวตี้ เลานจ์',
        subtitle: 'สัมผัสประสบการณ์บริการความงามระดับหรูพร้อมความสะดวกในการชำระเงินด้วย SOLVY',
        book_now: 'จองตอนนี้ด้วย SOLVY',
        services: 'บริการ',
        gift_cards: 'บัตรของขวัญ',
        gift_card_bonus: 'Get ${bonus} bonus value!',
        total_value: 'Total Value',
        purchase_with_solvy: 'Purchase with SOLVY',
        book_appointment: 'Book Appointment',
        booking_success: 'Appointment booked!',
        booking_error: 'Failed to book appointment. Please try again.',
        gift_card_success: 'Gift card purchased successfully!',
        gift_card_error: 'Failed to purchase gift card. Please try again.',
      }
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
    },
  });

export default i18n;
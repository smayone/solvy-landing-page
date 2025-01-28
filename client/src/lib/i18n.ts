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
        analytics: 'Analytics',
        home: 'Home',
        member: 'Member',
        nft_avatar: 'NFT Avatar',
        ebl: 'EBL',
        buy_crypto: 'Buy Crypto',
        reign: 'Reign',
        remittance: 'Send Money'
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
      },
      remittance: {
        title: 'International Money Transfer',
        subtitle: 'Send money to your loved ones worldwide',
        conversion_widget: {
          title: 'Currency Converter',
          from: 'From',
          to: 'To',
          amount: 'Amount',
          converted: 'Converted Amount',
          rate: 'Exchange Rate'
        },
        tracking: {
          title: 'Transfer Tracking',
          status: {
            pending: 'Processing',
            completed: 'Completed',
            failed: 'Failed'
          },
          details: {
            recipient: 'Recipient',
            amount: 'Amount',
            date: 'Date',
            status: 'Status'
          }
        },
        success: {
          title: 'Transfer Successful!',
          message: 'Your money has been sent successfully',
          recipient_notified: 'Recipient has been notified'
        }
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
        analytics: 'Análisis',
        reign: 'Reign',
        home: 'Inicio',
        member: 'Miembro',
        nft_avatar: 'Avatar NFT',
        ebl: 'EBL',
        education: 'Educación',
        buy_crypto: 'Comprar Cripto',
        remittance: 'Enviar Dinero'
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
      nav: {
        decidey: 'DECIDEY',
        solvy: 'SOLVY',
        man: 'MAN',
        connect_wallet: '连接钱包',
        language: '语言',
        evergreen: '常青美容',
        analytics: '分析',
        reign: 'Reign',
        home: '主页',
        member: '会员',
        nft_avatar: 'NFT 头像',
        ebl: 'EBL',
        education: '教育',
        buy_crypto: '购买加密货币',
        remittance: '汇款'
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
      nav: {
        decidey: 'DECIDEY',
        solvy: 'SOLVY',
        man: 'MAN',
        connect_wallet: '지갑 연결',
        language: '언어',
        evergreen: '에버그린 뷰티',
        analytics: '분석',
        reign: 'Reign',
        home: '홈',
        member: '회원',
        nft_avatar: 'NFT 아바타',
        ebl: 'EBL',
        education: '교육',
        buy_crypto: '암호화폐 구매',
        remittance: '송금'
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
      nav: {
        decidey: 'DECIDEY',
        solvy: 'SOLVY',
        man: 'MAN',
        connect_wallet: 'Kết nối ví',
        language: 'Ngôn ngữ',
        evergreen: 'Evergreen Beauty',
        analytics: 'Phân tích',
        reign: 'Reign',
        home: 'Trang chủ',
        member: 'Thành viên',
        nft_avatar: 'Avatar NFT',
        ebl: 'EBL',
        education: 'Giáo dục',
        buy_crypto: 'Mua tiền điện tử',
        remittance: 'Chuyển tiền'
      }
    }
  },
  fr: {
    translation: {
      nav: {
        home: 'Accueil',
        member: 'Membre',
        nft_avatar: 'Avatar NFT',
        ebl: 'EBL',
        analytics: 'Analytique',
        education: 'Éducation',
        buy_crypto: 'Acheter Crypto',
        reign: 'Reign',
        remittance: 'Envoyer de l\'argent'
      }
    }
  },
  'fr-HT': {
    translation: {
      nav: {
        home: 'Akèy',
        member: 'Manm',
        nft_avatar: 'Avatar NFT',
        ebl: 'EBL',
        analytics: 'Analitik',
        education: 'Edikasyon',
        buy_crypto: 'Achte Kriptomone',
        reign: 'Reign',
        remittance: 'Voye lajan'
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
    debug: true,
    interpolation: {
      escapeValue: false
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage']
    }
  });

export default i18n;
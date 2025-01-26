import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: {
      hero: {
        title: 'SOLVY: Gain Financial Sovereignty',
        vulture_economy: 'Companies are profiting billions from your data, which they hold captive in their databases-and they\'re counting on you not realizing its worth. In a vulture economy, businesses circle around individual needs, profiting from vulnerabilities rather than fostering growth. But what if your finances were as resilient as a disaster recovery solution, and your data was protected like a vault?',
        solutions_valued: 'Solvy.chain: Solutions Valued You. We\'re breaking those chains, building a cooperative, DAO-driven future where trade and commerce are mutually beneficial and truly empower individuals.',
      },
      dao: {
        title: 'Decentralized Autonomous Organization',
        description: 'A blockchain-based organization governed by transparent rules and community decisions',
        features: {
          governance: 'Community-driven governance',
          transparency: 'Transparent decision making',
          voting: 'Token-based voting rights',
          proposals: 'Community proposals',
          treasury: 'Shared treasury management'
        },
        participation: {
          join: 'Join the DAO',
          propose: 'Make a Proposal',
          vote: 'Vote on Proposals',
          stake: 'Stake Tokens'
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
      concepts: {
        dao: {
          title: 'DAO Concepts & Terminology',
          description: 'Essential concepts for understanding Decentralized Autonomous Organizations',
          terms: {
            governance: {
              title: 'Governance',
              description: 'The system of rules, practices, and processes by which a DAO is directed and controlled'
            },
            token_economics: {
              title: 'Token Economics',
              description: 'The economic system governing the creation, distribution, and management of tokens within a DAO'
            },
            voting_mechanisms: {
              title: 'Voting Mechanisms',
              description: 'Systems used to make collective decisions, including quadratic voting and token-weighted voting'
            },
            smart_contracts: {
              title: 'Smart Contracts',
              description: 'Self-executing contracts with terms directly written into code that automate DAO operations'
            },
            treasury: {
              title: 'Treasury Management',
              description: 'The handling and allocation of DAO funds and resources through community governance'
            }
          },
          advanced_concepts: {
            delegation: 'Vote delegation and representative democracy in DAOs',
            ragequit: 'The ability to exit a DAO with your fair share of assets',
            timelock: 'Delayed execution of approved proposals for security',
            multisig: 'Multi-signature wallet requirements for enhanced security'
          }
        }
      }
    }
  },
  es: {
    translation: {
      dao: {
        title: 'Organización Autónoma Descentralizada',
        description: 'Una organización basada en blockchain gobernada por reglas transparentes y decisiones comunitarias',
        features: {
          governance: 'Gobernanza impulsada por la comunidad',
          transparency: 'Toma de decisiones transparente',
          voting: 'Derechos de voto basados en tokens',
          proposals: 'Propuestas comunitarias',
          treasury: 'Gestión compartida del tesoro'
        },
        participation: {
          join: 'Unirse al DAO',
          propose: 'Hacer una Propuesta',
          vote: 'Votar Propuestas',
          stake: 'Hacer Staking de Tokens'
        }
      },
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
      }
    }
  },
  vi: {
    translation: {
      dao: {
        title: 'Tổ Chức Tự Trị Phi Tập Trung',
        description: 'Tổ chức dựa trên blockchain được quản lý bởi quy tắc minh bạch và quyết định cộng đồng',
        features: {
          governance: 'Quản trị dựa vào cộng đồng',
          transparency: 'Ra quyết định minh bạch',
          voting: 'Quyền bỏ phiếu dựa trên token',
          proposals: 'Đề xuất cộng đồng',
          treasury: 'Quản lý kho bạc chung'
        },
        participation: {
          join: 'Tham Gia DAO',
          propose: 'Tạo Đề Xuất',
          vote: 'Bỏ Phiếu Đề Xuất',
          stake: 'Stake Token'
        }
      },
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
      }
    }
  },
  zh: {
    translation: {
      dao: {
        title: '去中心化自治组织',
        description: '基于区块链的组织，由透明规则和社区决策管理',
        features: {
          governance: '社区驱动治理',
          transparency: '透明决策过程',
          voting: '代币投票权',
          proposals: '社区提案',
          treasury: '共同财库管理'
        },
        participation: {
          join: '加入DAO',
          propose: '提交提案',
          vote: '投票表决',
          stake: '质押代币'
        }
      },
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
      }
    }
  },
  ko: {
    translation: {
      dao: {
        title: '탈중앙화 자율 조직',
        description: '투명한 규칙과 커뮤니티 결정으로 운영되는 블록체인 기반 조직',
        features: {
          governance: '커뮤니티 주도 거버넌스',
          transparency: '투명한 의사결정',
          voting: '토큰 기반 투표권',
          proposals: '커뮤니티 제안',
          treasury: '공동 자금 관리'
        },
        participation: {
          join: 'DAO 참여하기',
          propose: '제안하기',
          vote: '투표하기',
          stake: '토큰 스테이킹'
        }
      },
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
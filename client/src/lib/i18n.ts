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
        }
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
        }
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
        }
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
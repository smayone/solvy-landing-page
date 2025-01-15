import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: {
      hero: {
        title: 'SOLVY: Gain Financial Sovereignty',
        vulture_economy: 'In a "vulture economy," businesses circle around individual needs, profiting from vulnerabilities rather than fostering growth. But what if your finances were as resilient as a wildfire-resistant forest, and your data was protected like a vault?',
        solutions_valued: 'Solvy.chain: Solutions Valued You. We\'re breaking those chains, building a cooperative, DAO-driven future where trade and commerce are mutually beneficial and truly empower individuals.',
      },
      benefits: {
        financial_autonomy: {
          title: 'Financial autonomy',
          description: 'Take control of your money, your way.'
        },
        data_security: {
          title: 'Data security',
          description: 'Protect your identity and assets with blockchain technology.'
        },
        community_strength: {
          title: 'Community strength',
          description: 'Join a network of support and shared prosperity.'
        }
      },
      nav: {
        decidey: 'DECIDEY',
        solvy: 'SOLVY',
        man: 'MAN',
        connect_wallet: 'Connect Wallet',
        language: 'Language'
      }
    }
  },
  es: {
    translation: {
      hero: {
        title: 'SOLVY: Obtén Soberanía Financiera',
        vulture_economy: 'En una "economía buitre", las empresas giran en torno a las necesidades individuales, beneficiándose de las vulnerabilidades en lugar de fomentar el crecimiento. ¿Pero qué pasaría si tus finanzas fueran tan resistentes como un bosque resistente a los incendios y tus datos estuvieran protegidos como una bóveda?',
        solutions_valued: 'Solvy.chain: Soluciones que te Valoran. Estamos rompiendo esas cadenas, construyendo un futuro cooperativo impulsado por DAO donde el comercio es mutuamente beneficioso y verdaderamente empodera a los individuos.',
      },
      benefits: {
        financial_autonomy: {
          title: 'Autonomía financiera',
          description: 'Toma el control de tu dinero, a tu manera.'
        },
        data_security: {
          title: 'Seguridad de datos',
          description: 'Protege tu identidad y activos con tecnología blockchain.'
        },
        community_strength: {
          title: 'Fuerza comunitaria',
          description: 'Únete a una red de apoyo y prosperidad compartida.'
        }
      },
      nav: {
        decidey: 'DECIDEY',
        solvy: 'SOLVY',
        man: 'MAN',
        connect_wallet: 'Conectar Billetera',
        language: 'Idioma'
      }
    }
  },
  vi: {
    translation: {
      hero: {
        title: 'SOLVY: Đạt được Chủ quyền Tài chính',
        vulture_economy: 'Trong một "nền kinh tế kền kền", các doanh nghiệp xoay quanh nhu cầu cá nhân, thu lợi từ những điểm yếu thay vì thúc đẩy tăng trưởng. Nhưng nếu tài chính của bạn bền vững như một khu rừng chống cháy và dữ liệu của bạn được bảo vệ như một két sắt thì sao?',
        solutions_valued: 'Solvy.chain: Giải pháp Đánh giá Bạn. Chúng tôi đang phá vỡ những xiềng xích đó, xây dựng một tương lai hợp tác được điều hành bởi DAO, nơi thương mại mang lại lợi ích cho cả hai bên và thực sự trao quyền cho cá nhân.',
      }
      // Additional Vietnamese translations will be added similarly
    }
  },
  zh: {
    translation: {
      hero: {
        title: 'SOLVY: 获得金融主权',
        vulture_economy: '在"秃鹫经济"中，企业围绕个人需求盘旋，从漏洞中获利而不是促进增长。但是，如果您的财务像防火林一样坚韧，您的数据像保险库一样受到保护，会怎样？',
        solutions_valued: 'Solvy.chain：重视您的解决方案。我们正在打破这些枷锁，建立一个由DAO驱动的合作未来，在这里贸易和商业是互惠互利的，真正赋予个人力量。',
      }
      // Additional Chinese translations will be added similarly
    }
  },
  ko: {
    translation: {
      hero: {
        title: 'SOLVY: 금융 주권 획득',
        vulture_economy: '"벌처 이코노미"에서 기업들은 개인의 필요를 중심으로 돌며, 성장을 촉진하기보다는 취약점을 이용해 이익을 얻습니다. 하지만 당신의 재정이 산불에 강한 숲처럼 견고하고, 데이터가 금고처럼 보호된다면 어떨까요?',
        solutions_valued: 'Solvy.chain: 당신을 소중히 여기는 솔루션. 우리는 이러한 사슬을 깨고, DAO가 주도하는 협력적 미래를 구축하여 거래와 상업이 상호 이익이 되고 진정으로 개인에게 힘을 실어주는 것을 목표로 합니다.',
      }
      // Additional Korean translations will be added similarly
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

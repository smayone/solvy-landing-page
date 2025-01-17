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
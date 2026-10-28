import { useState, useEffect, useMemo } from 'react';
import {
  Sparkles,
  Copy,
  Check,
  Clock,
  Calendar,
  TrendingUp,
  Smartphone,
  Monitor,
  History,
  Trash2,
  Zap,
  Moon,
  Sun,
  Rocket,
  Flame,
  HeartHandshake,
  Mail,
  Star,
  Archive,
  AlertOctagon,
  Reply,
  MoreVertical,
  Code,
  FileText,
  Wand2,
  Edit3,
  CheckCircle2,
  X,
  RefreshCw,
  Award,
  Layers,
  Tag,
  Building2,
  Cpu,
  Sliders,
  Image as ImageIcon,
  Table,
  BarChart3,
  ArrowRight,
  Search
} from 'lucide-react';

// ============================================================================
// 1. DỮ LIỆU NGÀNH HÀNG & AI DỰ BÁO KHUNG GIỜ VÀNG (SEND-TIME INTELLIGENCE)
// ============================================================================
const INDUSTRIES = [
  {
    id: 'tech',
    name: 'Công nghệ, Điện tử & Thiết bị (Tech)',
    sendTime: {
      launch: {
        window: '09:30 - 11:00 AM',
        days: 'Thứ Ba & Thứ Tư',
        openRate: 42.8,
        ctr: 9.4,
        reason:
          'Khách hàng yêu công nghệ thường đọc tin tức sản phẩm mới và xem bảng thông số kỹ thuật vào đầu giờ làm việc buổi sáng.'
      },
      promo: {
        window: '12:00 - 01:30 PM & 08:30 - 10:00 PM',
        days: 'Thứ Sáu & Chủ Nhật',
        openRate: 45.2,
        ctr: 11.2,
        reason:
          'Khung giờ nghỉ trưa và tối cuối tuần là thời điểm người dùng so sánh giá Flash Sale và quyết định chốt đơn thiết bị điện tử.'
      },
      care: {
        window: '10:00 - 11:30 AM',
        days: 'Thứ Năm',
        openRate: 48.5,
        ctr: 12.0,
        reason:
          'Giữa tuần là thời điểm lý tưởng để gửi thư tri ân VIP, nhắc lịch bảo dưỡng định kỳ hoặc tặng đặc quyền nâng cấp.'
      }
    }
  },
  {
    id: 'ecommerce',
    name: 'Thương mại điện tử & Bán lẻ (E-commerce)',
    sendTime: {
      launch: {
        window: '10:00 - 11:30 AM',
        days: 'Thứ Tư & Thứ Năm',
        openRate: 39.4,
        ctr: 8.1,
        reason:
          'Người mua sắm trực tuyến có xu hướng khám phá bộ sưu tập mới vào giữa tuần trước khi lên kế hoạch chi tiêu.'
      },
      promo: {
        window: '11:30 AM - 01:00 PM & 08:00 - 10:30 PM',
        days: 'Thứ Sáu & Thứ Bảy',
        openRate: 46.8,
        ctr: 12.5,
        reason:
          'Tỷ lệ áp mã giảm giá và chốt giỏ hàng đạt đỉnh vào khung giờ vàng buổi tối trước ngày nghỉ cuối tuần.'
      },
      care: {
        window: '09:30 - 11:00 AM',
        days: 'Thứ Ba',
        openRate: 44.1,
        ctr: 9.8,
        reason:
          'Khách hàng thân thiết mở email quà tặng tri ân và điểm thưởng Loyalty cao nhất vào buổi sáng đầu tuần.'
      }
    }
  },
  {
    id: 'beauty',
    name: 'Thời trang & Mỹ phẩm (Fashion & Beauty)',
    sendTime: {
      launch: {
        window: '07:30 - 09:30 PM',
        days: 'Thứ Tư & Thứ Sáu',
        openRate: 43.6,
        ctr: 9.7,
        reason:
          'Khung giờ thư giãn buổi tối là lúc phái đẹp dành nhiều thời gian tìm hiểu thành phần dưỡng da và xu hướng mới.'
      },
      promo: {
        window: '12:00 - 01:30 PM & 08:30 - 10:00 PM',
        days: 'Thứ Sáu & Chủ Nhật',
        openRate: 47.9,
        ctr: 13.1,
        reason:
          'Các chiến dịch mua 1 tặng 1 hoặc trợ giá làm đẹp có tỷ lệ chuyển đổi cao vượt trội vào tối cuối tuần.'
      },
      care: {
        window: '08:00 - 09:30 PM',
        days: 'Thứ Năm & Chủ Nhật',
        openRate: 49.2,
        ctr: 11.8,
        reason:
          'Thời điểm khách hàng thực hiện chu trình skincare buổi tối, rất dễ đồng cảm với thư tri ân và lời khuyên chăm sóc.'
      }
    }
  },
  {
    id: 'fnb',
    name: 'Ẩm thực & Đồ uống (F&B)',
    sendTime: {
      launch: {
        window: '09:30 - 10:45 AM',
        days: 'Thứ Ba & Thứ Sáu',
        openRate: 41.2,
        ctr: 9.5,
        reason:
          'Gửi ngay trước giờ ăn trưa hoặc giờ trà chiều kích thích vị giác và nhu cầu đặt thử món mới cùng đồng nghiệp.'
      },
      promo: {
        window: '10:15 - 11:15 AM & 02:30 - 04:00 PM',
        days: 'Thứ Năm, Thứ Sáu & Thứ Bảy',
        openRate: 48.4,
        ctr: 14.2,
        reason:
          'Khung giờ "cơn đói buổi trưa" và "trà chiều công sở" mang lại tỷ lệ bấm đặt món ngay lập tức.'
      },
      care: {
        window: '09:00 - 10:30 AM',
        days: 'Chủ Nhật & Thứ Hai',
        openRate: 45.7,
        ctr: 10.6,
        reason:
          'Gửi tặng E-voucher đồ uống hoặc quà sinh nhật vào buổi sáng tạo tâm lý hứng khởi cho cả tuần mới.'
      }
    }
  },
  {
    id: 'edtech',
    name: 'Giáo dục & Khóa học (EdTech)',
    sendTime: {
      launch: {
        window: '08:00 - 09:30 PM',
        days: 'Thứ Ba & Thứ Năm',
        openRate: 40.5,
        ctr: 8.6,
        reason:
          'Học viên và người đi làm thường tìm hiểu lộ trình nâng cấp kỹ năng mới vào buổi tối yên tĩnh.'
      },
      promo: {
        window: '07:30 - 10:00 PM',
        days: 'Thứ Bảy & Chủ Nhật',
        openRate: 44.0,
        ctr: 10.4,
        reason:
          'Cuối tuần là lúc người học sẵn sàng đăng ký học phí ưu đãi để bắt đầu khóa học vào tuần kế tiếp.'
      },
      care: {
        window: '09:00 - 10:30 AM',
        days: 'Thứ Tư',
        openRate: 46.3,
        ctr: 11.1,
        reason:
          'Phù hợp để gửi tài liệu độc quyền, lộ trình cá nhân hóa và quà tri ân học viên cũ.'
      }
    }
  }
];

// ============================================================================
// 2. MỤC TIÊU CHIẾN DỊCH, TÔNG GIỌNG & KỊCH BẢN DEMO
// ============================================================================
const GOALS = [
  {
    id: 'launch',
    label: 'Ra mắt sản phẩm',
    headerBadge: 'THÔNG BÁO CHÍNH THỨC • OFFICIAL CAMPAIGN',
    iconName: 'rocket'
  },
  {
    id: 'promo',
    label: 'Khuyến mãi',
    headerBadge: 'CHIẾN DỊCH FLASH SALE • SPECIAL DEAL',
    iconName: 'flame'
  },
  {
    id: 'care',
    label: 'Chăm sóc khách hàng',
    headerBadge: 'ĐẶC QUYỀN TRI ÂN • VIP LOYALTY CARE',
    iconName: 'heart'
  }
];

const TONES = [
  { id: 'formal', label: 'Trang trọng', emoji: '🎩' },
  { id: 'humorous', label: 'Hài hước', emoji: '😄' },
  { id: 'urgent', label: 'Khẩn cấp', emoji: '⚡' }
];

const DEMO_PRESETS = [
  {
    brandName: 'Sony Bravia VN',
    productName: 'TV OLED 50 inch 4K AI',
    industry: 'tech',
    goal: 'launch',
    offer:
      'Chính thức ra mắt siêu phẩm giải trí tại gia "TV OLED 50 inch 4K AI" từ Sony Bravia VN — Tích hợp tấm nền hiển thị thế hệ mới với độ tương phản tuyệt đối, tần số quét 120Hz siêu mượt và âm thanh vòm Dolby Atmos sống động. Đặc quyền đặt trước hôm nay: Giảm ngay 33%, tặng kèm Loa Soundbar không dây trị giá 3.500.000đ và gói miễn phí lắp đặt treo tường tận nơi!',
    tone: 'formal'
  },
  {
    brandName: 'ASUS ROG Vietnam',
    productName: 'Laptop Gaming ROG Zephyrus OLED 16 inch RTX',
    industry: 'tech',
    goal: 'promo',
    offer:
      'Đại tiệc Flash Sale công nghệ! Sở hữu ngay "Laptop Gaming ROG Zephyrus OLED 16 inch RTX" với mức trợ giá giảm trực tiếp 25%, tặng kèm Chuột Gaming không dây, Balo ROG chống nước và gói bảo hành VIP 24 tháng toàn cầu!',
    tone: 'urgent'
  },
  {
    brandName: 'L’Aura Paris Skincare',
    productName: 'Serum Tinh Chất Vàng 24K Peptide Trẻ Hóa',
    industry: 'beauty',
    goal: 'care',
    offer:
      'Lời cảm ơn chân thành gửi tới Hội viên VIP của L’Aura Paris! Tặng riêng Quý khách đặc quyền ưu đãi 35% khi nâng cấp liệu trình "Serum Tinh Chất Vàng 24K Peptide Trẻ Hóa", kèm 01 buổi soi da & massage nâng cơ chuyên sâu miễn phí tại hệ thống Spa.',
    tone: 'formal'
  },
  {
    brandName: 'Nike Running VN',
    productName: 'Giày Chạy Bộ Air Zoom Carbon Fly 4',
    industry: 'ecommerce',
    goal: 'launch',
    offer:
      'Chính thức trình làng "Giày Chạy Bộ Air Zoom Carbon Fly 4" tích hợp đế sợi Carbon toàn phần giúp hoàn trả 92% năng lượng. Đặt trước hôm nay giảm ngay 20% kèm tất chạy bộ chuyên dụng và ấn phẩm khắc tên riêng!',
    tone: 'humorous'
  },
  {
    brandName: 'Phúc Long Heritage',
    productName: 'Bộ Quà Trà Ô Long Thượng Hạng Hoàng Kim',
    industry: 'fnb',
    goal: 'care',
    offer:
      'Tri ân Khách hàng Thân thiết đã đồng hành cùng Phúc Long Heritage! Gửi tặng bạn Voucher ưu đãi 30% cho "Bộ Quà Trà Ô Long Thượng Hạng Hoàng Kim" cùng đặc quyền thưởng trà miễn phí tại không gian VIP Lounge.',
    tone: 'formal'
  }
];

const QUICK_PRODUCT_CHIPS = [
  {
    label: '📺 TV OLED 50" 4K AI',
    brand: 'Sony Bravia VN',
    product: 'TV OLED 50 inch 4K AI',
    industry: 'tech',
    offer:
      'Chính thức ra mắt siêu phẩm giải trí tại gia "TV OLED 50 inch 4K AI" từ Sony Bravia VN — Tích hợp tấm nền hiển thị thế hệ mới với độ tương phản tuyệt đối, tần số quét 120Hz siêu mượt và âm thanh vòm Dolby Atmos sống động. Đặc quyền đặt trước hôm nay: Giảm ngay 33%, tặng kèm Loa Soundbar không dây trị giá 3.500.000đ và gói miễn phí lắp đặt treo tường tận nơi!'
  },
  {
    label: '💻 Laptop Gaming RTX',
    brand: 'ASUS ROG Vietnam',
    product: 'Laptop Gaming ROG Zephyrus OLED 16 inch RTX',
    industry: 'tech',
    offer:
      'Sở hữu siêu phẩm "Laptop Gaming ROG Zephyrus OLED 16 inch RTX" với vi xử lý AI thế hệ mới và card đồ họa RTX 4080. Giảm ngay 25%, tặng bộ Gear ROG trị giá 4.200.000đ!'
  },
  {
    label: '📱 iPhone 16 Pro Max',
    brand: 'Apple Authorized VN',
    product: 'Điện thoại iPhone 16 Pro Max Titan 256GB',
    industry: 'tech',
    offer:
      'Trải nghiệm "Điện thoại iPhone 16 Pro Max Titan 256GB" cùng hệ thống Camera 48MP ProRAW và chip A18 Pro. Ưu đãi giảm 18%, hỗ trợ thu cũ đổi mới trợ giá 3.000.000đ và trả góp 0%!'
  },
  {
    label: '✨ Serum Vàng 24K',
    brand: 'L’Aura Paris Skincare',
    product: 'Serum Tinh Chất Vàng 24K Peptide',
    industry: 'beauty',
    offer:
      'Đánh thức làn da căng bóng với "Serum Tinh Chất Vàng 24K Peptide" — Công nghệ vi nang thẩm thấu sâu gấp 5 lần. Ưu đãi 35% kèm bộ quà mini-size trị giá 1.200.000đ!'
  },
  {
    label: '👟 Giày Chạy Bộ Carbon',
    brand: 'Nike Running VN',
    product: 'Giày Chạy Bộ Air Zoom Carbon Fly',
    industry: 'ecommerce',
    offer:
      'Bứt tốc mọi cung đường Marathon cùng "Giày Chạy Bộ Air Zoom Carbon Fly" siêu nhẹ 185g. Ưu đãi 25% và miễn phí giao hàng hỏa tốc toàn quốc!'
  },
  {
    label: '🍵 Trà Ô Long Hoàng Kim',
    brand: 'Phúc Long Heritage',
    product: 'Trà Ô Long Thượng Hạng Hoàng Kim',
    industry: 'fnb',
    offer:
      'Thưởng thức hương vị nguyên bản từ đồi chè cổ thụ với "Trà Ô Long Thượng Hạng Hoàng Kim". Ưu đãi 30% và tặng kèm bình giữ nhiệt cao cấp!'
  }
];

// ============================================================================
// 3. BỘ PHÂN TÍCH TỪ KHÓA REGEX & SMART MATCHER ENGINE
// ============================================================================
function analyzeProductAndMatchSpecs(productName = '', offerText = '', brandName = '') {
  const pLower = productName.toLowerCase();
  const fullLower = `${productName} ${offerText}`.toLowerCase();

  // Trích xuất % giảm giá tự động từ nội dung ưu đãi (nếu có), mặc định 33%
  const discountMatch = fullLower.match(/(\d{1,2})\s*%/);
  const discountPercent = discountMatch ? parseInt(discountMatch[1], 10) : 33;

  // Trích xuất kích thước inch (nếu có)
  const inchMatch = pLower.match(/(\d{2,3})\s*(inch|")/);
  const inchValue = inchMatch ? inchMatch[1] : '50';

  // --------------------------------------------------------------------------
  // NHÁNH 1: LAPTOP / MACBOOK / PC GAMING (Ưu tiên kiểm tra trước TV để không bị lẫn từ khóa OLED)
  // --------------------------------------------------------------------------
  if (/(laptop|macbook|notebook|pc|zephyrus|thinkpad|legion|rtx|core i)/i.test(pLower)) {
    const matchedKeywords = ['laptop', 'rtx/ai', inchMatch ? `${inchValue} inch` : '16 inch'];
    return {
      categoryName: 'Laptop & Điện toán Hiệu năng cao',
      matchedKeywords,
      discountPercent,
      imageBadge: 'NEXT-GEN AI LAPTOP • RTX SERIES',
      imageUrl:
        'https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=1200&q=85',
      oldPrice: '45.990.000đ',
      newPrice: `34.490.000đ (-${discountPercent}%)`,
      defaultCta: `ĐẶT TRƯỚC LAPTOP - GIẢM NGAY ${discountPercent}%`,
      kpis: [
        {
          value: 'RTX + AI NPU',
          title: 'Hiệu năng Đồ họa & AI',
          sub: 'Tăng tốc xử lý 3.2x lần'
        },
        {
          value: '240Hz Nebula',
          title: `Màn hình chuẩn màu 100% DCI-P3`,
          sub: 'Phản hồi 0.2ms siêu mượt'
        },
        {
          value: 'Pin 18 Giờ',
          title: 'Tản nhiệt Buồng hơi Kép',
          sub: 'Mỏng nhẹ chỉ 1.5kg'
        }
      ],
      tableHeaders: [
        'Thông số kỹ thuật Laptop',
        'Laptop văn phòng / Thế hệ cũ',
        'Đột phá trên Phiên bản Mới'
      ],
      comparisonRows: [
        {
          feature: 'Vi xử lý & Card đồ họa',
          standard: 'Xung nhịp cơ bản, dễ nghẽn khi render nặng',
          upgrade: 'Chip AI NPU chuyên dụng + GPU RTX Ray Tracing thế hệ mới'
        },
        {
          feature: 'Công nghệ Màn hình & Tần số quét',
          standard: '60Hz IPS độ sáng thấp, viền dày',
          upgrade: 'Tấm nền chuẩn Đồ họa 240Hz + Độ sáng 1000 nits'
        },
        {
          feature: 'Hệ thống Tản nhiệt & Bảo hành',
          standard: 'Quạt đơn ồn ào, bảo hành 12 tháng tiêu chuẩn',
          upgrade: 'Tản nhiệt Kim loại lỏng êm ái + Bảo hành VIP 24 tháng'
        }
      ]
    };
  }

  // --------------------------------------------------------------------------
  // NHÁNH 2: ĐIỆN THOẠI / SMARTPHONE / IPHONE / GALAXY
  // --------------------------------------------------------------------------
  if (/(điện thoại|iphone|samsung|galaxy|smartphone|xiaomi|oppo|titan)/i.test(pLower)) {
    return {
      categoryName: 'Flagship Smartphone & Di động AI',
      matchedKeywords: ['smartphone', 'camera pro', '5g ai'],
      discountPercent,
      imageBadge: 'FLAGSHIP 5G • PRO CAMERA AI',
      imageUrl:
        'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=1200&q=85',
      oldPrice: '34.990.000đ',
      newPrice: `28.690.000đ (-${discountPercent}%)`,
      defaultCta: `SỞ HỮU FLAGSHIP MỚI - ƯU ĐÃI ${discountPercent}%`,
      kpis: [
        {
          value: 'Camera 200MP',
          title: 'Zoom Quang Học AI 10x',
          sub: 'Quay phim 8K Cinema'
        },
        {
          value: 'Chip 3nm Pro',
          title: 'Hiệu năng Đỉnh cao',
          sub: 'Chơi game 120FPS mượt mà'
        },
        {
          value: 'Khung Titan',
          title: 'Sạc nhanh 100% trong 25p',
          sub: 'Kháng nước chuẩn IP68'
        }
      ],
      tableHeaders: [
        'Hạng mục Công nghệ',
        'Điện thoại thế hệ trước',
        'Đột phá trên Flagship Mới'
      ],
      comparisonRows: [
        {
          feature: 'Hệ thống Camera & Quay đêm',
          standard: 'Dễ nhiễu hạt khi thiếu sáng, chống rung cơ bản',
          upgrade: 'Cảm biến lớn thu sáng +200% & Chống rung OIS điện ảnh'
        },
        {
          feature: 'Vật liệu khung vỏ & Màn hình',
          standard: 'Khung nhôm dễ trầy, kính cường lực thường',
          upgrade: 'Khung Titan cấp độ Hàng không + Màn hình 2600 nits'
        },
        {
          feature: 'Thời lượng Pin & Đặc quyền',
          standard: 'Pin dùng trong ngày, bảo hành 12 tháng',
          upgrade: 'Pin AI 2 ngày + Bảo hành rơi vỡ 24 tháng 1 đổi 1'
        }
      ]
    };
  }

  // --------------------------------------------------------------------------
  // NHÁNH 3: MỸ PHẨM / SERUM / KEM DƯỠNG / NƯỚC HOA / SKINCARE
  // --------------------------------------------------------------------------
  if (/(serum|kem|dưỡng|mỹ phẩm|son|nước hoa|skincare|peptide|collagen|retinol|chống nắng)/i.test(pLower)) {
    return {
      categoryName: 'Dược Mỹ Phẩm & Chăm Sóc Sắc Đẹp Cao Cấp',
      matchedKeywords: ['serum/skincare', 'peptide 24k', 'clinical'],
      discountPercent,
      imageBadge: 'DERMA CLINICAL • 99.9% PURE ESSENCE',
      imageUrl:
        'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=1200&q=85',
      oldPrice: '2.450.000đ',
      newPrice: `1.590.000đ (-${discountPercent}%)`,
      defaultCta: `NHẬN ƯU ĐÃI LÀM ĐẸP - GIẢM NGAY ${discountPercent}%`,
      kpis: [
        {
          value: '99.9% Tinh Khiết',
          title: 'Tinh chất Vàng 24K & Peptide',
          sub: 'Thẩm thấu sâu gấp 5 lần'
        },
        {
          value: 'Sau 7 Ngày',
          title: 'Cấp ẩm & Căng bóng da',
          sub: 'Kiểm nghiệm da liễu lâm sàng'
        },
        {
          value: '0% Cồn & Paraben',
          title: 'An toàn cho da nhạy cảm',
          sub: `Độc quyền từ ${brandName || 'Thương hiệu'}`
        }
      ],
      tableHeaders: [
        'Tiêu chí Dưỡng da Lâm sàng',
        'Sản phẩm dưỡng thông thường',
        'Đột phá Công nghệ Vi nang Mới'
      ],
      comparisonRows: [
        {
          feature: 'Công nghệ Thẩm thấu & Kết cấu',
          standard: 'Phân tử lớn chỉ nằm trên bề mặt, dễ gây bết dính',
          upgrade: 'Công nghệ Nano-Liposome thấm sâu tới tầng hạ bì trong 3 giây'
        },
        {
          feature: 'Hiệu quả Phục hồi & Trẻ hóa',
          standard: 'Cần 2-3 tháng để thấy sự thay đổi nhỏ',
          upgrade: 'Làn da căng mọng, mờ nếp nhăn rõ rệt chỉ sau 7-14 ngày'
        },
        {
          feature: 'Độ lành tính & Cam kết chất lượng',
          standard: 'Chứa hương liệu tổng hợp dễ kích ứng',
          upgrade: '100% Thuần chay chuẩn Âu + Hoàn tiền nếu không hợp da'
        }
      ]
    };
  }

  // --------------------------------------------------------------------------
  // NHÁNH 4: GIÀY DÉP / THỜI TRANG / QUẦN ÁO / ĐỒNG HỒ / TÚI XÁCH
  // --------------------------------------------------------------------------
  if (/(giày|sneaker|áo|quần|váy|thời trang|túi|đồng hồ|running|carbon)/i.test(pLower)) {
    return {
      categoryName: 'Thời trang Hiệu năng & Phong cách Sống',
      matchedKeywords: ['footwear/fashion', 'carbon zoom', 'ultralight'],
      discountPercent,
      imageBadge: 'PRO PERFORMANCE • LIMITED EDITION',
      imageUrl:
        'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1200&q=85',
      oldPrice: '5.890.000đ',
      newPrice: `4.190.000đ (-${discountPercent}%)`,
      defaultCta: `SỞ HỮU PHIÊN BẢN GIỚI HẠN (-${discountPercent}%)`,
      kpis: [
        {
          value: 'Siêu Nhẹ 185g',
          title: 'Chất liệu Sợi Carbon',
          sub: 'Thoáng khí tối đa 360°'
        },
        {
          value: '+92% Năng Lượng',
          title: 'Đệm Phản hồi Tức thì',
          sub: 'Bảo vệ khớp cổ chân'
        },
        {
          value: 'Độ Bền x3 Lần',
          title: 'Chống trượt Mọi địa hình',
          sub: 'Bảo hành keo & đế 12 tháng'
        }
      ],
      tableHeaders: [
        'Đặc tính Thiết kế & Vật liệu',
        'Dòng sản phẩm tiêu chuẩn',
        'Đột phá trên Phiên bản Mới'
      ],
      comparisonRows: [
        {
          feature: 'Cấu trúc Đệm & Hoàn trả lực',
          standard: 'Đế EVA thông thường dễ xẹp sau 3 tháng sử dụng',
          upgrade: 'Tấm sợi Carbon toàn phần + Đệm bọt khí siêu đàn hồi'
        },
        {
          feature: 'Trọng lượng & Độ thoáng khí',
          standard: 'Nặng trên 300g, dễ gây bí nóng khi vận động lâu',
          upgrade: 'Sợi dệt Flyknit siêu nhẹ 185g thoáng khí gấp 4 lần'
        },
        {
          feature: 'Chính sách Đổi trả & Cá nhân hóa',
          standard: 'Không hỗ trợ đổi size sau khi mở hộp',
          upgrade: 'Miễn phí đổi size 30 ngày + Tặng kèm khắc tên độc quyền'
        }
      ]
    };
  }

  // --------------------------------------------------------------------------
  // NHÁNH 5: ẨM THỰC / ĐỒ UỐNG / TRÀ / CÀ PHÊ / NHÀ HÀNG
  // --------------------------------------------------------------------------
  if (/(trà|cà phê|coffee|tea|bánh|ẩm thực|nhà hàng|lẩu|nướng|matcha|ô long)/i.test(pLower)) {
    return {
      categoryName: 'Ẩm thực Thượng hạng & Đồ uống Thủ công',
      matchedKeywords: ['f&b', 'thượng hạng', 'organic 100%'],
      discountPercent,
      imageBadge: 'PREMIUM ARTISAN • 100% ORGANIC FARM',
      imageUrl:
        'https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=1200&q=85',
      oldPrice: '890.000đ',
      newPrice: `599.000đ (-${discountPercent}%)`,
      defaultCta: `THƯỞNG THỨC NGAY - ƯU ĐÃI ${discountPercent}%`,
      kpis: [
        {
          value: '100% Organic',
          title: 'Tuyển chọn Búp trà Cổ thụ',
          sub: 'Thu hoạch thủ công sương sớm'
        },
        {
          value: 'Ủ Lạnh 48 Giờ',
          title: 'Giữ trọn Hương vị Nguyên bản',
          sub: 'Hậu vị ngọt thanh tự nhiên'
        },
        {
          value: 'Hộp Quà Hoàng Kim',
          title: 'Thiết kế Sang trọng Đẳng cấp',
          sub: 'Giao nhanh trong 2 giờ'
        }
      ],
      tableHeaders: [
        'Tiêu chí Hương vị & Chất lượng',
        'Thức uống pha chế đại trà',
        'Đột phá Tuyệt phẩm Thượng hạng'
      ],
      comparisonRows: [
        {
          feature: 'Nguồn gốc Nguyên liệu & Thu hoạch',
          standard: 'Nguyên liệu công nghiệp, dùng hương liệu tổng hợp',
          upgrade: '100% Búp trà cổ thụ & Hạt Arabica tuyển chọn thủ công'
        },
        {
          feature: 'Công nghệ Chế biến & Bảo quản',
          standard: 'Pha sẵn để lâu làm mất mùi thơm tự nhiên',
          upgrade: 'Chiết xuất lạnh Cold-Brew giữ trọn 98% chất chống oxy hóa'
        },
        {
          feature: 'Trải nghiệm Đóng gói & Quà tặng',
          standard: 'Bao bì giấy thông thường',
          upgrade: 'Hộp cứng ép kim Hoàng Gia + Tặng kèm bình giữ nhiệt'
        }
      ]
    };
  }

  // --------------------------------------------------------------------------
  // NHÁNH MẶC ĐỊNH: TV OLED / SMART TV / THIẾT BỊ NGHE NHÌN & CÔNG NGHỆ
  // --------------------------------------------------------------------------
  return {
    categoryName: 'Thiết bị Nghe nhìn & Giải trí Tại gia AI',
    matchedKeywords: ['tv/oled', `${inchValue} inch`, '4k 120hz ai'],
    discountPercent,
    imageBadge: `SMART OLED TV ${inchValue} INCH 4K`,
    imageUrl:
      'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&w=1200&q=85',
    oldPrice: '23.000.000đ',
    newPrice: `15.490.000đ (-${discountPercent}%)`,
    defaultCta: `ĐẶT TRƯỚC TV OLED ${inchValue}" - GIẢM NGAY ${discountPercent}%`,
    kpis: [
      {
        value: 'OLED 4K',
        title: `Màn hình ${inchValue} Inch`,
        sub: 'Tràn viền siêu mỏng 99%'
      },
      {
        value: '120Hz AI',
        title: 'Tần số quét thực',
        sub: 'Chuyển động mượt mà'
      },
      {
        value: 'Dolby Atmos',
        title: 'Âm thanh Điện ảnh',
        sub: 'Công suất loa 60W vòm 3D'
      }
    ],
    tableHeaders: [
      'Thông số kỹ thuật TV',
      'TV LED thế hệ thông thường',
      'Đột phá trên Phiên bản Mới'
    ],
    comparisonRows: [
      {
        feature: 'Công nghệ tấm nền & Độ sâu màu đen',
        standard: 'Đèn nền LED dễ hở sáng viền',
        upgrade: 'Điểm ảnh tự phát sáng OLED chuẩn Điện ảnh'
      },
      {
        feature: 'Bộ vi xử lý Hình ảnh & Tần số quét',
        standard: '60Hz cơ bản, dễ nhòe khi xem bóng đá',
        upgrade: 'Chip AI 4K Upscaling + Tần số quét 120Hz'
      },
      {
        feature: 'Thiết kế viền & Chế độ bảo hành',
        standard: 'Viền dày 15mm, bảo hành 12 tháng',
        upgrade: 'Thiết kế tràn viền siêu mỏng + Bảo hành 36 tháng tận nhà'
      }
    ]
  };
}

// ============================================================================
// 3.5 HÀM TỰ ĐỘNG VIẾT LẠI Ô NỘI DUNG ƯU ĐÃI (OFFER TEXT) THEO MỤC TIÊU
// ============================================================================
function generateGoalSpecificOfferText(goalId, productName = '', brandName = '', currentOffer = '') {
  const brand = brandName?.trim() || 'Sony Bravia VN';
  const product = productName?.trim() || 'TV OLED 50 inch 4K AI';
  const matchedSpec = analyzeProductAndMatchSpecs(product, currentOffer, brand);
  const pct = matchedSpec.discountPercent || 33;
  const pLower = product.toLowerCase();

  // Xác định quà tặng & dịch vụ đặc trưng theo từng dòng sản phẩm
  let launchBonus = 'tặng kèm bộ quà độc quyền chính hãng và miễn phí giao lắp tận nơi';
  let promoBonus = 'tặng thêm Voucher 1.000.000đ, miễn phí giao hàng hỏa tốc 2H và hỗ trợ trả góp 0%';
  let careBonus = 'tặng gói bảo dưỡng/vệ sinh định kỳ miễn phí, nhân đôi điểm thưởng Loyalty và chăm sóc VIP 1-1';

  if (/(laptop|macbook|notebook|pc|zephyrus|thinkpad|legion|rtx|core i)/i.test(pLower)) {
    launchBonus = 'tặng bộ Gear Gaming ROG + Balo chống nước trị giá 4.200.000đ và gói bảo hành VIP 24 tháng';
    promoBonus = 'tặng Chuột không dây + Đế tản nhiệt nhôm, miễn phí nâng cấp RAM/SSD và trả góp 0% lãi suất';
    careBonus = 'miễn phí vệ sinh laptop & tra keo tản nhiệt Kim loại lỏng trọn đời, kèm đặc quyền Thu cũ lên đời trợ giá 4.000.000đ';
  } else if (/(điện thoại|iphone|samsung|galaxy|smartphone|xiaomi|oppo|titan)/i.test(pLower)) {
    launchBonus = 'tặng củ sạc nhanh chính hãng, ốp lưng MagSafe cao cấp và gói bảo hành rơi vỡ 1 đổi 1 trong 24 tháng';
    promoBonus = 'trợ giá Thu cũ đổi mới lên tới 3.000.000đ, trả góp 0% qua thẻ tín dụng và freeship hỏa tốc trong 1 giờ';
    careBonus = 'tặng gói thay miếng dán màn hình & vệ sinh máy miễn phí 1 năm, kèm Voucher nâng cấp phụ kiện chính hãng';
  } else if (/(serum|kem|dưỡng|mỹ phẩm|son|nước hoa|skincare|peptide|collagen|retinol|chống nắng)/i.test(pLower)) {
    launchBonus = 'tặng kèm bộ Kit dưỡng da mini-size trị giá 1.200.000đ và máy massage tinh chất cầm tay';
    promoBonus = 'áp dụng Mua 1 Tặng 1 bộ mặt nạ cấp ẩm chuyên sâu, tặng thêm E-voucher 300.000đ và Freeship toàn quốc';
    careBonus = 'tặng 01 buổi Soi da AI & Massage nâng cơ trẻ hóa miễn phí tại hệ thống Spa, kèm quà sinh nhật Hội viên VIP';
  } else if (/(giày|sneaker|áo|quần|váy|thời trang|túi|đồng hồ|running|carbon)/i.test(pLower)) {
    launchBonus = 'tặng kèm 03 đôi tất chạy bộ chuyên dụng kháng khuẩn, túi rút thể thao và đặc quyền khắc tên riêng lên sản phẩm';
    promoBonus = 'mua từ 2 sản phẩm giảm thêm 10%, miễn phí vận chuyển hỏa tốc và hỗ trợ đổi size tận nhà trong 30 ngày';
    careBonus = 'tặng gói Spa vệ sinh & phủ Nano chống thấm nước miễn phí 06 tháng, kèm thẻ VIP ưu tiên mua bộ sưu tập giới hạn';
  } else if (/(trà|cà phê|coffee|tea|bánh|ẩm thực|nhà hàng|lẩu|nướng|matcha|ô long)/i.test(pLower)) {
    launchBonus = 'tặng kèm Bình giữ nhiệt khắc tên cao cấp, bộ ấm chén thưởng trà gốm sứ và thiệp thiết kế thủ công';
    promoBonus = 'tặng ngay 02 E-Voucher đồ uống miễn phí, giảm thêm 100.000đ cho đơn tiếp theo và giao nhanh trong 30 phút';
    careBonus = 'tặng đặc quyền thưởng trà & bánh ngọt miễn phí tại không gian VIP Lounge, kèm hộp quà tri ân Hội viên Thân thiết';
  } else {
    launchBonus = 'tặng kèm Loa Soundbar không dây trị giá 3.500.000đ, gói giải trí 4K 12 tháng và miễn phí lắp đặt treo tường tận nơi';
    promoBonus = 'tặng kèm Giá treo thông minh, miễn phí giao lắp hỏa tốc trong ngày và hỗ trợ trả góp 0% lãi suất';
    careBonus = 'tặng gói bảo dưỡng & cân chỉnh màu sắc màn hình tại nhà miễn phí, kèm đặc quyền Thu cũ đổi mới trợ giá 5.000.000đ';
  }

  if (goalId === 'promo') {
    return `🔥 ĐẠI TIỆC FLASH SALE — Săn ngay "${product}" chính hãng từ ${brand} với mức trợ giá trực tiếp -${pct}% trên giá niêm yết (Chỉ còn ${matchedSpec.newPrice.split(' ')[0]}). Đặc quyền chốt đơn trong khung giờ vàng hôm nay: ${promoBonus}!`;
  }

  if (goalId === 'care') {
    return `💖 ĐẶC QUYỀN TRI ÂN HỘI VIÊN VIP — ${brand} trân trọng gửi tặng riêng Quý khách thân thiết Voucher ưu đãi ${pct}% khi nâng cấp hoặc mua thêm "${product}", đi kèm gói hậu mãi đặc biệt: ${careBonus}!`;
  }

  // Mặc định: Ra mắt sản phẩm (launch)
  return `🚀 CHÍNH THỨC RA MẮT SIÊU PHẨM — Công bố "${product}" thế hệ mới nhất từ ${brand} với công nghệ ${matchedSpec.kpis[0]?.value || 'đột phá'} & ${matchedSpec.kpis[1]?.value || 'hiệu năng đỉnh cao'}. Đặc quyền đặt trước (Pre-order) hôm nay: Giảm ngay ${pct}%, ${launchBonus}!`;
}

// ============================================================================
// 4. BỘ TẠO 03 MẪU EMAIL TỰ ĐỘNG GHÉP SMART MATCHER (TÁCH BIỆT 3 THUẬT TOÁN THEO MỤC TIÊU)
// ============================================================================
function buildThreeRichVariants({ brandName, productName, industry, goal, offer, tone }) {
  const brand = brandName?.trim() || 'Sony Bravia VN';
  const product = productName?.trim() || 'TV OLED 50 inch 4K AI';
  const cleanOffer =
    offer?.trim() ||
    `Chính thức ra mắt "${product}" từ ${brand} với công nghệ đột phá và ưu đãi giảm ngay 33% cùng quà tặng độc quyền hôm nay!`;

  const industryObj = INDUSTRIES.find((i) => i.id === industry) || INDUSTRIES[0];
  const goalObj = GOALS.find((g) => g.id === goal) || GOALS[0];
  const matchedSpec = analyzeProductAndMatchSpecs(product, cleanOffer, brand);

  // ==========================================================================
  // THUẬT TOÁN 1: RA MẮT SẢN PHẨM (LAUNCH)
  // ==========================================================================
  const launchToneContent = {
    formal: {
      v1: {
        subject: `[${brand}] Chính thức công bố ${product} — Đặc quyền ưu đãi -${matchedSpec.discountPercent}%`,
        bannerHeadline: `${product} — Bước tiến mới nâng tầm trải nghiệm từ ${brand}`,
        greeting: 'Kính gửi Quý khách hàng thân thiết,',
        intro: `Chúng tôi luôn trân trọng sự quan tâm của bạn đối với các giải pháp thuộc lĩnh vực ${industryObj.name}. Hôm nay, ${brand} tự hào công bố "${product}" cùng bảng thống kê hiệu quả thực tế được thiết kế tối ưu nhất cho nhu cầu của bạn.`,
        cta: matchedSpec.defaultCta
      },
      v2: {
        subject: `Câu chuyện kiến tạo chuẩn mực mới: ${product} từ ${brand}`,
        bannerHeadline: `Tuyệt tác ${product} — Khi công nghệ & đẳng cấp hội tụ tại ${brand}`,
        greeting: 'Thân gửi Quý khách hàng đồng hành cùng thương hiệu,',
        intro: `Đằng sau mỗi thế hệ sản phẩm thuộc ngành ${industryObj.name} là hàng ngàn giờ nghiên cứu tận tâm của đội ngũ kỹ sư ${brand}. "${product}" chính là minh chứng rõ nét nhất cho cam kết mang lại giá trị vượt trội và bền vững dành riêng cho Quý khách.`,
        cta: `KHÁM PHÁ & ĐẶT TRƯỚC ${product.toUpperCase()} (-${matchedSpec.discountPercent}%)`
      },
      v3: {
        subject: `[Mời Riêng Tư] Suất đặt trước giới hạn ${product} dành cho Hội viên VIP`,
        bannerHeadline: `Đặc quyền ưu tiên sở hữu ${product} — Giới hạn từ ${brand}`,
        greeting: 'Kính gửi Quý khách hàng Ưu tiên (VIP Member),',
        intro: `Do số lượng phân bổ đợt đầu của "${product}" rất giới hạn, ${brand} trân trọng gửi lời mời đặt trước độc quyền này đến danh sách khách hàng thân thiết trước khi mở bán rộng rãi trên toàn hệ thống.`,
        cta: `GIỮ SUẤT VIP ${product.toUpperCase()} - GIẢM ${matchedSpec.discountPercent}%`
      }
    },
    humorous: {
      v1: {
        subject: `🎉 Cẩn thận "đổ đứ đừ" trước siêu phẩm ${product} vừa cập bến ${brand}!`,
        bannerHeadline: `${product} — Cực phẩm khiến bạn muốn rinh về nhà ngay lập tức!`,
        greeting: `Chào người anh em sành điệu của ${brand} 👋,`,
        intro: `Nghe đồn bạn đang tìm kiếm một "chân ái" mới trong làng ${industryObj.name}? Không cần đi đâu xa nữa, ${brand} vừa trình làng "${product}" với loạt thông số đỉnh của chóp khiến ai nhìn vào cũng phải trầm trồ:`,
        cta: `CHỐT ĐƠN ${product.toUpperCase()} KẺO LỠ (-${matchedSpec.discountPercent}%)`
      },
      v2: {
        subject: `🤫 Bật mí "vũ khí bí mật" ${product} mà đội ngũ ${brand} ấp ủ bấy lâu!`,
        bannerHeadline: `${product} — Nâng cấp trải nghiệm lên tầm vũ trụ cùng ${brand}!`,
        greeting: `Hé lô bạn hiền của ${brand} ✨,`,
        intro: `Sau bao ngày "ăn ngủ tại phòng lab", đội ngũ ${brand} đã chính thức cho ra lò siêu phẩm "${product}". Nhìn vào bảng so sánh thông số bên dưới là đủ hiểu vì sao chiếc deal này lại làm bộ phận kế toán toát mồ hôi hột:`,
        cta: `RINH NGAY SIÊU PHẨM - GIẢM TỚI ${matchedSpec.discountPercent}%`
      },
      v3: {
        subject: `👀 90% tín đồ ${brand} đang săn lùng suất ưu đãi ${product} này!`,
        bannerHeadline: `${product} — Số lượng cực hiếm, chỉ dành cho người nhanh tay!`,
        greeting: `Suỵt! Ghé sát vào đây ${brand} bật mí nhỏ nè 🤫,`,
        intro: `Nếu bạn đang đọc được email này thì "nhân phẩm" hôm nay đạt điểm 10 tuyệt đối! "${product}" đang được săn đón rần rần nhưng bạn đã được giữ sẵn một vé vàng giảm ngay ${matchedSpec.discountPercent}% dưới đây:`,
        cta: `BẤM NHẬN VÉ VÀNG ${product.toUpperCase()} NGAY`
      }
    },
    urgent: {
      v1: {
        subject: `⚡ [KHẨN CẤP] Mở cổng đặt trước ${product} — Giảm ${matchedSpec.discountPercent}% chỉ trong hôm nay!`,
        bannerHeadline: `${product} — Cơ hội sở hữu siêu phẩm từ ${brand} với mức giá tốt nhất!`,
        greeting: `Thông báo khẩn từ ${brand} gửi Quý khách hàng,`,
        intro: `Đồng hồ đang đếm ngược! Ngay sau khi ${brand} công bố "${product}", lượng đơn đặt trước đã tăng vọt gấp 3 lần dự kiến. Hãy kiểm tra ngay bảng thông số đột phá bên dưới và khóa mức ưu đãi -${matchedSpec.discountPercent}% trước khi hết suất:`,
        cta: matchedSpec.defaultCta
      },
      v2: {
        subject: `🔥 [CHÁY HÀNG] Chỉ còn 15 suất ưu đãi ${product} kèm quà tặng độc quyền!`,
        bannerHeadline: `${product} — Bùng nổ công nghệ mới từ ${brand}, đừng bỏ lỡ!`,
        greeting: `Gửi bạn — Người luôn dẫn đầu xu hướng cùng ${brand},`,
        intro: `85% số lượng suất ưu đãi đợt 1 của "${product}" đã có chủ chỉ sau vài giờ mở cổng! ${brand} vẫn đang tạm giữ quyền lợi giảm ${matchedSpec.discountPercent}% kèm quà tặng giá trị cao cho tài khoản của bạn:`,
        cta: `KÍCH HOẠT ƯU ĐÃI -${matchedSpec.discountPercent}% TRƯỚC 23:59`
      },
      v3: {
        subject: `⏳ [CẢNH BÁO CUỐI] Đếm ngược 3 giờ cuối cùng nhận đặc quyền ${product}!`,
        bannerHeadline: `${product} — Cơ hội cuối cùng trước khi giá quay về niêm yết!`,
        greeting: `THÔNG BÁO CUỐI CÙNG TỪ ${brand.toUpperCase()}!`,
        intro: `Hệ thống sẽ tự động đóng cổng ưu đãi đặt trước "${product}" ngay khi chạm mốc 100% số lượng phân bổ. Đừng để mình phải mua với giá gốc vào ngày mai — xem ngay sự khác biệt vượt trội dưới đây:`,
        cta: `GIỮ SUẤT CUỐI CÙNG - GIẢM NGAY ${matchedSpec.discountPercent}%`
      }
    }
  };

  // ==========================================================================
  // THUẬT TOÁN 2: CHIẾN DỊCH KHUYẾN MÃI / FLASH SALE (PROMO)
  // ==========================================================================
  const promoToneContent = {
    formal: {
      v1: {
        subject: `🔥 [ĐẠI TIỆC ƯU ĐÃI] Sở hữu ${product} từ ${brand} với mức trợ giá -${matchedSpec.discountPercent}%`,
        bannerHeadline: `Tuần Lễ Vàng ${brand} — Ưu đãi đặc biệt -${matchedSpec.discountPercent}% cho ${product}`,
        greeting: 'Kính gửi Quý khách hàng,',
        intro: `Nhằm mang đến cơ hội sở hữu dòng sản phẩm "${product}" với mức ngân sách tối ưu nhất trong năm, ${brand} chính thức triển khai chương trình Trợ Giá Đặc Biệt kết hợp gói quà tặng giá trị cao dành cho khách hàng đặt mua trực tuyến trong đợt khuyến mãi này.`,
        cta: `ÁP MÃ GIẢM ${matchedSpec.discountPercent}% & MUA NGAY ${product.toUpperCase()}`
      },
      v2: {
        subject: `🎁 Giải pháp đầu tư thông minh: Săn ưu đãi ${product} tiết kiệm tới ${matchedSpec.discountPercent}%`,
        bannerHeadline: `Mua Sắm Thông Minh Cùng ${brand} — Sở hữu ${product} Giá Tốt Nhất Năm`,
        greeting: 'Thân gửi Quý khách hàng đang quan tâm đến sản phẩm,',
        intro: `Nếu Quý khách đã từng cân nhắc nâng cấp lên "${product}" nhưng còn chờ đợi một thời điểm có mức giá hợp lý nhất, thì đây chính là cơ hội vàng. ${brand} vừa kích hoạt gói ưu đãi kép: Giảm trực tiếp trên giá niêm yết kèm đặc quyền Freeship & quà tặng chính hãng.`,
        cta: `NHẬN COMBO KHUYẾN MÃI ${product.toUpperCase()} (-${matchedSpec.discountPercent}%)`
      },
      v3: {
        subject: `💎 [VOUCHER ĐỘC QUYỀN] Tặng Quý khách suất mua ${product} giảm sâu ${matchedSpec.discountPercent}%`,
        bannerHeadline: `Đặc Quyền Săn Sale Giới Hạn — Tiết kiệm ngay ${matchedSpec.discountPercent}% khi đặt ${product}`,
        greeting: 'Kính gửi Quý khách hàng trong danh sách Ưu tiên,',
        intro: `Trong khuôn khổ chiến dịch Khuyến mãi lớn nhất quý của ${brand}, chúng tôi dành riêng một lượng suất trợ giá sâu -${matchedSpec.discountPercent}% cho siêu phẩm "${product}". Mức giá ưu đãi này chỉ áp dụng cho các đơn hàng xác nhận trực tiếp qua email chiến dịch hôm nay.`,
        cta: `XÁC NHẬN ĐƠN HÀNG ƯU ĐÃI -${matchedSpec.discountPercent}% NGAY`
      }
    },
    humorous: {
      v1: {
        subject: `💸 Ví tiền mỉm cười! ${brand} tung deal ${product} giảm sốc tới ${matchedSpec.discountPercent}%!`,
        bannerHeadline: `Sale Chấn Động Cùng ${brand} — Rinh ${product} Giá Hời Không Tưởng!`,
        greeting: `Hú hú các "thợ săn deal" chính hiệu của ${brand} ơi 🛒,`,
        intro: `Ai bảo hàng xịn là phải đau ví? Hôm nay ${brand} chơi lớn "xả kho" ưu đãi cho cực phẩm "${product}" với mức giảm chấn động ${matchedSpec.discountPercent}%. Vừa được hàng đỉnh, vừa dư tiền đi trà sữa cả tháng — nhìn bảng quyền lợi sale bên dưới là muốn chốt đơn liền tay:`,
        cta: `BỎ GIỎ CHỐT DEAL -${matchedSpec.discountPercent}% KẺO HẾT`
      },
      v2: {
        subject: `😂 Sếp đi vắng! Tụi mình lén giảm ${matchedSpec.discountPercent}% cho ${product} trong 24h!`,
        bannerHeadline: `Deal Ngon Như Mơ — Giảm Thẳng ${matchedSpec.discountPercent}% + Tặng Quà Ngập Tràn!`,
        greeting: `Chào đồng môn hệ "chờ Sale mới chốt" 👋,`,
        intro: `Sự kiên nhẫn của bạn đã được đền đáp xứng đáng! Chiếc "${product}" mà bạn thả tim bấy lâu nay vừa chính thức lên sàn Flash Sale của ${brand}. Giá đã giảm sâu ${matchedSpec.discountPercent}% lại còn đính kèm cả rổ quà tặng xịn sò thế này thì làm sao mà cưỡng lại được:`,
        cta: `HỐT TRỌN COMBO SALE ${product.toUpperCase()} NGAY`
      },
      v3: {
        subject: `🏃‍♂️ Chạy ngay đi! Mã giảm ${matchedSpec.discountPercent}% cho ${product} đang bốc hơi cực nhanh!`,
        bannerHeadline: `Tốc Độ Quyết Định Ví Tiền — Săn Ngay ${product} Giá Sập Sàn!`,
        greeting: `Báo động đỏ cho các tín đồ săn sale của ${brand} 🚨,`,
        intro: `Tin vui là "${product}" đang được giảm giá sập sàn ${matchedSpec.discountPercent}%. Tin buồn là hội chị em bạn dì đang bấm áp mã nhanh như chớp! Đừng để tới lúc bấm vào chỉ còn dòng chữ "Hết lượt khuyến mãi" đầy tiếc nuối nhé:`,
        cta: `GIẬT NGAY VOUCHER GIẢM ${matchedSpec.discountPercent}%`
      }
    },
    urgent: {
      v1: {
        subject: `⚡ [FLASH SALE 24H] Giảm trực tiếp ${matchedSpec.discountPercent}% cho ${product} — Số lượng có hạn!`,
        bannerHeadline: `FLASH SALE BÙNG NỔ — Săn ${product} Giảm Sốc ${matchedSpec.discountPercent}% Chỉ Hôm Nay!`,
        greeting: `THÔNG BÁO FLASH SALE KHẨN TỪ ${brand.toUpperCase()},`,
        intro: `Cổng Flash Sale lớn nhất tháng đã chính thức mở! Trong khung giờ vàng hôm nay, "${product}" được trợ giá trực tiếp ${matchedSpec.discountPercent}% từ ngân sách khuyến mãi của ${brand}. Ngay khi hết định mức suất sale, giá sẽ tự động quay về mức niêm yết ban đầu:`,
        cta: `SĂN FLASH SALE ${product.toUpperCase()} (-${matchedSpec.discountPercent}%) NGAY`
      },
      v2: {
        subject: `🔥 [CHÁY SUẤT KHUYẾN MÃI] 88% mã giảm ${matchedSpec.discountPercent}% cho ${product} đã được lấy!`,
        bannerHeadline: `Đếm Ngược Giờ Vàng — Chốt Đơn ${product} Trước Khi Đóng Cổng Sale!`,
        greeting: `Gửi Quý khách hàng đang theo dõi chiến dịch Sale của ${brand},`,
        intro: `Tốc độ chốt đơn "${product}" trong đợt khuyến mãi này đang vượt mọi kỷ lục! Hiện chỉ còn đúng những suất trợ giá -${matchedSpec.discountPercent}% cuối cùng trên hệ thống kèm đặc quyền quà tặng miễn phí. Hãy khóa ngay mức giá hời này trước khi đồng hồ điểm 00:00:`,
        cta: `GIỮ GIÁ FLASH SALE -${matchedSpec.discountPercent}% NGAY LẬP TỨC`
      },
      v3: {
        subject: `⏳ [3 GIỜ CUỐI] Kết thúc chương trình giảm ${matchedSpec.discountPercent}% cho ${product} tối nay!`,
        bannerHeadline: `Cơ Hội Cuối Cùng Trong Năm — Tiết kiệm ${matchedSpec.discountPercent}% Khi Mua ${product}!`,
        greeting: `CẢNH BÁO ĐÓNG CỔNG KHUYẾN MÃI TỪ ${brand.toUpperCase()}!`,
        intro: `Chỉ còn chưa đầy 3 giờ nữa, toàn bộ mã giảm giá ${matchedSpec.discountPercent}% và gói quà tặng đi kèm của "${product}" sẽ chính thức hết hiệu lực. Đừng bỏ lỡ cơ hội tiết kiệm hàng triệu đồng ngay trong tầm tay bạn:`,
        cta: `ÁP MÃ GIẢM ${matchedSpec.discountPercent}% CUỐI CÙNG TRƯỚC 23:59`
      }
    }
  };

  // ==========================================================================
  // THUẬT TOÁN 3: CHĂM SÓC KHÁCH HÀNG & TRI ÂN HỘI VIÊN VIP (CARE)
  // ==========================================================================
  const careToneContent = {
    formal: {
      v1: {
        subject: `💖 [Thư Tri Ân Từ ${brand}] Gửi tặng Quý khách đặc quyền chăm sóc & ưu đãi ${product}`,
        bannerHeadline: `Tri Ân Hành Trình Đồng Hành — Đặc Quyền Hội Viên VIP Tại ${brand}`,
        greeting: 'Kính gửi Quý khách hàng thân thiết của chúng tôi,',
        intro: `Lời đầu tiên, đội ngũ ${brand} xin gửi lời cảm ơn chân thành nhất vì sự tin tưởng và đồng hành của Quý khách trong suốt thời gian qua. Như một món quà tri ân sâu sắc, chúng tôi xin gửi tặng Quý khách gói Đặc quyền Chăm sóc VIP cùng ưu đãi nâng cấp "${product}" dành riêng cho hạng thẻ của bạn.`,
        cta: `NHẬN QUÀ TRI ÂN VIP & ĐẶC QUYỀN (-${matchedSpec.discountPercent}%)`
      },
      v2: {
        subject: `✨ Chăm sóc trải nghiệm của bạn cùng ${brand}: Đặc quyền bảo dưỡng & nâng cấp ${product}`,
        bannerHeadline: `Bởi Vì Bạn Xứng Đáng — Dịch Vụ Chăm Sóc Chuẩn 5 Sao Từ ${brand}`,
        greeting: 'Thân gửi Quý khách hàng trân quý,',
        intro: `Tại ${brand}, mối quan hệ với khách hàng không dừng lại ở khoảnh khắc mua sắm mà bắt đầu từ trải nghiệm sử dụng mỗi ngày. Để giúp Quý khách luôn tận hưởng trọn vẹn giá trị từ dòng sản phẩm "${product}", phòng Chăm sóc Khách hàng xin gửi tặng gói quyền lợi hậu mãi và voucher tri ân độc quyền dưới đây:`,
        cta: `KÍCH HOẠT GÓI CHĂM SÓC VIP & VOUCHER TRI ÂN`
      },
      v3: {
        subject: `👑 [Đặc Quyền Hạng Thẻ VIP] Quà tặng sinh nhật & Ưu đãi tri ân ${product} dành riêng cho bạn`,
        bannerHeadline: `Tôn Vinh Khách Hàng Thân Thiết — Quà Tặng Cá Nhân Hóa Từ ${brand}`,
        greeting: 'Kính gửi Hội viên Danh dự (VIP Loyalty Member),',
        intro: `Dựa trên lịch sử gắn bó tuyệt vời của Quý khách cùng ${brand}, hệ thống đã tự động cộng thêm điểm thưởng vào tài khoản Hội viên của bạn, đồng thời mở khóa suất Đặc quyền Tri Ân (-${matchedSpec.discountPercent}% kèm gói chăm sóc 1-1) áp dụng riêng cho dòng sản phẩm "${product}".`,
        cta: `SỬ DỤNG ĐẶC QUYỀN HỘI VIÊN VIP NGAY`
      }
    },
    humorous: {
      v1: {
        subject: `💌 Nhớ bạn quá trời! ${brand} gửi chiếc ôm thật chặt kèm quà tri ân ${product} nè!`,
        bannerHeadline: `Cảm Ơn Vì Đã Là "Người Nhà" Của ${brand} — Quà Tặng Riêng Cho Bạn!`,
        greeting: `Gửi "người thương" lâu năm của đại gia đình ${brand} 🥰,`,
        intro: `Hôm nay không phải ngày lễ, cũng chẳng phải đợt sale đại trà, chỉ là đội ngũ ${brand} bỗng dưng nhớ tới bạn và muốn nói lời cảm ơn vì bạn đã luôn ủng hộ tụi mình! Để chứng minh "tình cảm chân thành", tụi mình xin gửi tặng riêng bạn gói quà chăm sóc VIP kèm chiếc voucher ấm áp cho "${product}":`,
        cta: `NHẬN QUÀ TÌNH CẢM TỪ ${brand.toUpperCase()} NGAY`
      },
      v2: {
        subject: `🎁 Điểm danh "Khách Ruột": ${brand} tặng riêng bạn đặc quyền chăm sóc & nâng cấp ${product}!`,
        bannerHeadline: `Khách Quen Là Phải Chiều Hết Nấc — Đặc Quyền VIP Từ ${brand}!`,
        greeting: `Hé lô "khách ruột" thân thương của ${brand} ✨,`,
        intro: `Người ngoài nhìn vào thì thấy "${product}" có giá niêm yết, nhưng với "người nhà" như bạn thì ${brand} luôn có lối đi riêng đầy yêu thương! Ngoài chế độ bảo dưỡng, chăm sóc tận răng 24/7, tụi mình còn gửi riêng bạn tấm thẻ đặc quyền giảm ngay ${matchedSpec.discountPercent}% dưới đây:`,
        cta: `MỞ HỘP QUÀ TRI ÂN KHÁCH RUỘT (-${matchedSpec.discountPercent}%)`
      },
      v3: {
        subject: `🤫 Suỵt! Món quà tri ân ${product} này ${brand} chỉ lén gửi cho riêng mình bạn thôi đó!`,
        bannerHeadline: `Đặc Quyền "Con Cưng" Của ${brand} — Chăm Sóc Chu Đáo Từ A Đến Á!`,
        greeting: `Chào VIP của lòng ${brand} 👑,`,
        intro: `Làm khách hàng thân thiết của ${brand} sướng nhất ở điểm nào? Chính là lâu lâu lại bất ngờ nhận được "thư tình" kèm quà tặng siêu to khổng lồ! Kiểm tra ngay bảng quyền lợi VIP Care bên dưới để thấy bạn được tụi mình ưu ái cỡ nào nhé:`,
        cta: `NHẬN ĐẶC QUYỀN "CON CƯNG" NGAY LẬP TỨC`
      }
    },
    urgent: {
      v1: {
        subject: `⏳ [Nhắc Nhở Hội Viên] Đừng quên kích hoạt gói Quà Tặng Tri Ân & Voucher ${product} của bạn!`,
        bannerHeadline: `Quyền Lợi Hội Viên VIP Đang Chờ Bạn — Kích Hoạt Trước Khi Hết Hạn!`,
        greeting: `Thông báo từ Phòng Chăm Sóc Khách Hàng VIP ${brand},`,
        intro: `Hệ thống ghi nhận tài khoản Hội viên thân thiết của Quý khách vẫn còn 01 suất Quà tặng Tri Ân kèm đặc quyền nâng cấp "${product}" (trợ giá -${matchedSpec.discountPercent}% & bảo dưỡng miễn phí) chưa được sử dụng. Hãy kích hoạt ngay hôm nay để không bỏ lỡ quyền lợi xứng đáng thuộc về bạn:`,
        cta: `KÍCH HOẠT QUYỀN LỢI TRI ÂN VIP NGAY`
      },
      v2: {
        subject: `🔔 [Sắp Hết Hạn Điểm Thưởng] Đổi ngay đặc quyền tri ân ${product} (-${matchedSpec.discountPercent}%) hôm nay!`,
        bannerHeadline: `Bảo Vệ Quyền Lợi VIP Của Bạn — Nâng Cấp & Chăm Sóc ${product} Ngay!`,
        greeting: `Thân gửi Quý khách hàng VIP của ${brand},`,
        intro: `Kỳ xét hạng thành viên và tổng kết quà tặng tri ân quý này của ${brand} sẽ khép lại vào cuối ngày hôm nay. Để đảm bảo gói quà tặng chăm sóc và mức ưu đãi tri ân -${matchedSpec.discountPercent}% cho "${product}" không bị hủy tự động, Quý khách vui lòng xác nhận quyền lợi bên dưới:`,
        cta: `XÁC NHẬN GIỮ QUÀ TRI ÂN VIP TRƯỚC 23:59`
      },
      v3: {
        subject: `⚡ [Thông Báo Cuối] 24h cuối để nhận gói Bảo dưỡng VIP & Voucher Tri Ân ${product}!`,
        bannerHeadline: `Đừng Bỏ Lỡ Món Quà Tri Ân Mà ${brand} Đã Chuẩn Bị Riêng Cho Bạn!`,
        greeting: `LỜI NHẮC QUAN TRỌNG TỪ CHĂM SÓC KHÁCH HÀNG ${brand.toUpperCase()},`,
        intro: `Món quà tri ân đặc biệt dành cho "${product}" gắn liền với mã số khách hàng thân thiết của bạn sẽ hết hiệu lực sau 24 giờ nữa. Chúng tôi rất tiếc nếu bạn bỏ lỡ gói chăm sóc toàn diện và mức tri ân sâu nhất năm này:`,
        cta: `NHẬN QUÀ TRI ÂN TRƯỚC KHI HẾT HẠN`
      }
    }
  };

  let selectedTonePack;
  let baseSpecPayload;

  if (goal === 'promo') {
    selectedTonePack = promoToneContent[tone] || promoToneContent.formal;
    baseSpecPayload = {
      headerBadge: goalObj.headerBadge,
      productName: product,
      brandName: brand,
      categoryName: matchedSpec.categoryName,
      matchedKeywords: matchedSpec.matchedKeywords,
      imageBadge: `FLASH SALE -${matchedSpec.discountPercent}% • ${matchedSpec.imageBadge}`,
      imageUrl: matchedSpec.imageUrl,
      oldPrice: matchedSpec.oldPrice,
      newPrice: matchedSpec.newPrice,
      kpis: [
        {
          value: `Giảm ${matchedSpec.discountPercent}%`,
          title: 'Trợ Giá Trực Tiếp',
          sub: `Giá chỉ còn ${matchedSpec.newPrice.split(' ')[0]}`
        },
        matchedSpec.kpis[0] || {
          value: 'Chính Hãng 100%',
          title: product,
          sub: `Bảo chứng từ ${brand}`
        },
        {
          value: 'Quà + Freeship',
          title: 'Trả Góp 0% Lãi Suất',
          sub: 'Giao nhanh hỏa tốc 2H'
        }
      ],
      offerBoxTitle: `CHI TIẾT CHƯƠNG TRÌNH KHUYẾN MÃI & QUÀ TẶNG (${product.toUpperCase()}):`,
      offerHighlight: cleanOffer,
      tableHeaders: [
        'Hạng mục Ưu đãi & Mua sắm',
        'Mua ngày thường (Giá niêm yết)',
        'Săn Sale Hôm Nay (Đặc quyền Chiến dịch)'
      ],
      comparisonRows: [
        {
          feature: `Chi phí sở hữu "${product}"`,
          standard: `Giá gốc niêm yết: ${matchedSpec.oldPrice}`,
          upgrade: `Giá Flash Sale chỉ ${matchedSpec.newPrice} (Tiết kiệm ngay ${matchedSpec.discountPercent}%)`
        },
        {
          feature: 'Gói Quà tặng & Voucher đi kèm',
          standard: 'Không áp dụng quà tặng mở rộng',
          upgrade: 'Tặng kèm bộ quà độc quyền + E-Voucher giảm thêm đơn sau'
        },
        {
          feature: 'Chính sách Giao hàng & Thanh toán',
          standard: 'Tính phí vận chuyển tiêu chuẩn',
          upgrade: 'Miễn phí giao hỏa tốc tận nơi + Hỗ trợ Trả góp 0% lãi suất'
        }
      ],
      trustBullets: [
        `Cam kết "${product}" chính hãng 100% nguyên seal từ ${brand} — Hoàn tiền 200% nếu phát hiện hàng không chuẩn.`,
        `Mức giá khuyến mãi -${matchedSpec.discountPercent}% được áp dụng đồng thời với quà tặng kèm và chính sách bảo hành đầy đủ.`,
        `Hỗ trợ khóa giá Flash Sale trong vòng 24 giờ ngay khi Quý khách đăng ký giữ suất qua nút bên dưới.`
      ],
      closingNote: `Ngân sách trợ giá Khuyến mãi cho "${product}" có giới hạn theo từng khung giờ. Hãy nhấn vào nút bên dưới để áp dụng ngay mã giảm ${matchedSpec.discountPercent}% trước khi chương trình kết thúc!`
    };
  } else if (goal === 'care') {
    selectedTonePack = careToneContent[tone] || careToneContent.formal;
    baseSpecPayload = {
      headerBadge: goalObj.headerBadge,
      productName: product,
      brandName: brand,
      categoryName: matchedSpec.categoryName,
      matchedKeywords: matchedSpec.matchedKeywords,
      imageBadge: `VIP MEMBER CARE • ${matchedSpec.imageBadge}`,
      imageUrl: matchedSpec.imageUrl,
      oldPrice: matchedSpec.oldPrice,
      newPrice: `Ưu đãi VIP: ${matchedSpec.newPrice}`,
      kpis: [
        {
          value: 'Hội Viên VIP',
          title: `Ưu đãi Tri Ân -${matchedSpec.discountPercent}%`,
          sub: 'Dành riêng cho tài khoản của bạn'
        },
        {
          value: 'Chăm Sóc 1-1',
          title: 'Bảo Dưỡng & Tư Vấn',
          sub: `Chuyên gia ${brand} hỗ trợ 24/7`
        },
        {
          value: 'x2 Điểm Thưởng',
          title: 'Tích Lũy Hạng Thẻ',
          sub: 'Cộng quà sinh nhật & lễ tết'
        }
      ],
      offerBoxTitle: `ĐẶC QUYỀN TRI ÂN & CHĂM SÓC HỘI VIÊN VIP (${product.toUpperCase()}):`,
      offerHighlight: cleanOffer,
      tableHeaders: [
        'Hạng mục Chăm sóc & Hậu mãi',
        'Quyền lợi Khách hàng Tiêu chuẩn',
        'Đặc quyền Hội viên Thân thiết (VIP Care)'
      ],
      comparisonRows: [
        {
          feature: `Đặc quyền Nâng cấp / Mua thêm "${product}"`,
          standard: `Áp dụng giá bán lẻ ${matchedSpec.oldPrice}`,
          upgrade: `Tặng Voucher Tri Ân giảm ${matchedSpec.discountPercent}% + Quà tặng khắc tên riêng`
        },
        {
          feature: 'Dịch vụ Hậu mãi, Bảo dưỡng & Đổi mới',
          standard: 'Bảo hành cơ bản theo thời hạn tiêu chuẩn',
          upgrade: 'Miễn phí kiểm tra/bảo dưỡng định kỳ + Ưu tiên Thu cũ đổi mới trợ giá cao'
        },
        {
          feature: 'Kênh Hỗ trợ Kỹ thuật & Chăm sóc',
          standard: 'Xếp hàng chờ qua tổng đài chung',
          upgrade: `Chuyên gia riêng từ ${brand} phục vụ 1-1 (Hotline VIP không chờ đợi)`
        }
      ],
      trustBullets: [
        `Món quà tri ân này được hệ thống ${brand} thiết kế riêng dựa trên sự gắn bó của Quý khách với thương hiệu.`,
        `Tặng kèm gói kiểm tra, vệ sinh/bảo dưỡng hoặc tư vấn chuyên sâu hoàn toàn miễn phí cho sản phẩm của bạn.`,
        `Mọi phản hồi của Quý khách luôn được Ban Giám đốc Dịch vụ Khách hàng ${brand} lắng nghe và xử lý ưu tiên trong 30 phút.`
      ],
      closingNote: `Sự hài lòng và tin yêu của Quý khách chính là tài sản quý giá nhất của ${brand}. Hãy nhấn vào nút bên dưới để nhận món quà tri ân hoặc đặt lịch chăm sóc VIP ngay hôm nay.`
    };
  } else {
    selectedTonePack = launchToneContent[tone] || launchToneContent.formal;
    baseSpecPayload = {
      headerBadge: goalObj.headerBadge,
      productName: product,
      brandName: brand,
      categoryName: matchedSpec.categoryName,
      matchedKeywords: matchedSpec.matchedKeywords,
      imageBadge: matchedSpec.imageBadge,
      imageUrl: matchedSpec.imageUrl,
      oldPrice: matchedSpec.oldPrice,
      newPrice: matchedSpec.newPrice,
      kpis: matchedSpec.kpis.map((k) => ({ ...k })),
      offerBoxTitle: `THÔNG TIN CHƯƠNG TRÌNH & ƯU ĐÃI (${product.toUpperCase()}):`,
      offerHighlight: cleanOffer,
      tableHeaders: [...matchedSpec.tableHeaders],
      comparisonRows: matchedSpec.comparisonRows.map((r) => ({ ...r })),
      trustBullets: [
        `Sản phẩm "${product}" đạt chứng nhận chất lượng chuẩn mực từ thương hiệu ${brand}.`,
        `Số liệu thực tế chứng minh hiệu quả vượt trội (xem chi tiết tại bảng thống kê bên dưới).`,
        `Đội ngũ chuyên gia ${brand} hỗ trợ tận tâm 24/7 trong suốt chiến dịch.`
      ],
      closingNote: `Hãy tham khảo bảng thống kê chi tiết và nhấn vào nút bên dưới để kích hoạt quyền lợi cho "${product}" ngay hôm nay.`
    };
  }

  const strategyLabels = {
    launch: [
      { name: 'Mẫu 01: Công bố & Thông số', strategy: 'Direct Specs & Launch • Tối ưu CTR cao nhất' },
      { name: 'Mẫu 02: Câu chuyện & Đột phá', strategy: 'Storytelling & Tech • Tăng độ tin cậy' },
      { name: 'Mẫu 03: Đặt trước VIP & FOMO', strategy: 'Pre-order Scarcity • Thúc đẩy giữ suất' }
    ],
    promo: [
      { name: 'Mẫu 01: Trực diện Săn Sale', strategy: 'Direct Deal & Price Cut • Chốt đơn nhanh' },
      { name: 'Mẫu 02: Bài toán Tiết kiệm', strategy: 'Smart Value & Combo • Thuyết phục hầu bao' },
      { name: 'Mẫu 03: Flash Sale Đếm ngược', strategy: 'Urgency & Stock Limit • Kích thích FOMO' }
    ],
    care: [
      { name: 'Mẫu 01: Thư Cảm ơn & Quà VIP', strategy: 'Gratitude & Loyalty Gift • Gắn kết sâu sắc' },
      { name: 'Mẫu 02: Đồng hành & Hậu mãi', strategy: 'After-sales & Care • Giữ chân khách hàng' },
      { name: 'Mẫu 03: Đặc quyền Hạng thẻ', strategy: 'Exclusive VIP Privilege • Tôn vinh vị thế' }
    ]
  };

  const activeStrategies = strategyLabels[goal] || strategyLabels.launch;

  return [
    {
      id: 1,
      name: activeStrategies[0].name,
      strategy: activeStrategies[0].strategy,
      badge: 'Chuẩn Bố Cục Thực Tế',
      ...selectedTonePack.v1,
      ...baseSpecPayload,
      kpis: baseSpecPayload.kpis.map((k) => ({ ...k })),
      comparisonRows: baseSpecPayload.comparisonRows.map((r) => ({ ...r }))
    },
    {
      id: 2,
      name: activeStrategies[1].name,
      strategy: activeStrategies[1].strategy,
      badge: 'Tăng Thiện Cảm Thương Hiệu',
      ...selectedTonePack.v2,
      ...baseSpecPayload,
      kpis: baseSpecPayload.kpis.map((k) => ({ ...k })),
      comparisonRows: baseSpecPayload.comparisonRows.map((r) => ({ ...r }))
    },
    {
      id: 3,
      name: activeStrategies[2].name,
      strategy: activeStrategies[2].strategy,
      badge: 'Bùng Nổ Chuyển Đổi',
      ...selectedTonePack.v3,
      ...baseSpecPayload,
      kpis: baseSpecPayload.kpis.map((k) => ({ ...k })),
      comparisonRows: baseSpecPayload.comparisonRows.map((r) => ({ ...r }))
    }
  ];
}

// ============================================================================
// HÀM COPY AN TOÀN TRONG MỌI TRÌNH DUYỆT
// ============================================================================
function copyToClipboardSafe(text) {
  try {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.left = '-9999px';
    textarea.style.top = '0';
    document.body.appendChild(textarea);
    textarea.focus();
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
    return true;
  } catch {
    return false;
  }
}

// Hàm render icon mục tiêu chiến dịch an toàn
function renderGoalIcon(iconName, className) {
  if (iconName === 'flame') return <Flame className={className} />;
  if (iconName === 'heart') return <HeartHandshake className={className} />;
  return <Rocket className={className} />;
}

export default function App() {
  // --------------------------------------------------------------------------
  // STATE GIAO DIỆN KÉP (DARK MODE vs LIGHT MODE)
  // --------------------------------------------------------------------------
  const [theme, setTheme] = useState(() => {
    try {
      const stored = localStorage.getItem('vibe_theme_mode');
      // Hỗ trợ cả key cũ để không bị lỗi lịch sử
      if (stored === 'dark' || stored === 'dark-cosmic') return 'dark';
      return 'light'; // Đặt mặc định là Light Mode
    } catch {
      return 'light';
    }
  });

  const isDark = theme === 'dark';

  useEffect(() => {
    try {
      localStorage.setItem('vibe_theme_mode', theme);
    } catch {
      // ignore
    }
  }, [theme]);

  // --------------------------------------------------------------------------
  // STATE CHIẾN DỊCH & SẢN PHẨM
  // --------------------------------------------------------------------------
  const [brandName, setBrandName] = useState(DEMO_PRESETS[0].brandName);
  const [productName, setProductName] = useState(DEMO_PRESETS[0].productName);
  const [industry, setIndustry] = useState(DEMO_PRESETS[0].industry);
  const [goal, setGoal] = useState(DEMO_PRESETS[0].goal);
  const [offer, setOffer] = useState(DEMO_PRESETS[0].offer);
  const [tone, setTone] = useState(DEMO_PRESETS[0].tone);

  const [variants, setVariants] = useState(() =>
    buildThreeRichVariants(DEMO_PRESETS[0])
  );
  const [activeVariantIdx, setActiveVariantIdx] = useState(0);
  const [isGenerating, setIsGenerating] = useState(false);

  // State cho Inbox Simulator & Bộ Tự Chỉnh Thông Số Thủ Công
  const [deviceView, setDeviceView] = useState('desktop');
  const [isStarred, setIsStarred] = useState(true);
  const [showManualSpecEditor, setShowManualSpecEditor] = useState(false);
  const [isInlineEditing, setIsInlineEditing] = useState(false);

  // State cho Lịch sử LocalStorage & Demo Preset
  const [presetIndex, setPresetIndex] = useState(0);
  const [showHistoryModal, setShowHistoryModal] = useState(false);
  const [historyList, setHistoryList] = useState(() => {
    try {
      const saved = localStorage.getItem('vibe_campaigns_history_v2');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [toast, setToast] = useState(null);

  const triggerToast = (message, subtext = '') => {
    setToast({ message, subtext });
    setTimeout(() => {
      setToast(null);
    }, 3000);
  };

  // Phân tích thời gian thực từ khóa sản phẩm đang gõ để hiển thị trên Pipeline
  const liveMatcherPreview = useMemo(
    () => analyzeProductAndMatchSpecs(productName, offer, brandName),
    [productName, offer, brandName]
  );

  const currentIndustryObj = useMemo(
    () => INDUSTRIES.find((item) => item.id === industry) || INDUSTRIES[0],
    [industry]
  );

  const currentSendTimeInfo = useMemo(
    () => currentIndustryObj.sendTime[goal] || currentIndustryObj.sendTime.launch,
    [currentIndustryObj, goal]
  );

  const currentVariant = variants[activeVariantIdx] || variants[0];

  // Lưu lịch sử vào LocalStorage
  const saveCampaignToHistory = (params, generatedVariants) => {
    const record = {
      id: Date.now(),
      timestamp: new Date().toLocaleTimeString('vi-VN', {
        hour: '2-digit',
        minute: '2-digit',
        day: '2-digit',
        month: '2-digit'
      }),
      ...params,
      variants: generatedVariants
    };
    const updated = [record, ...historyList].slice(0, 12);
    setHistoryList(updated);
    try {
      localStorage.setItem('vibe_campaigns_history_v2', JSON.stringify(updated));
    } catch {
      // ignore
    }
  };

  // --------------------------------------------------------------------------
  // HÀM SINH EMAIL TỰ ĐỘNG QUA REGEX & SMART MATCHER ENGINE
  // --------------------------------------------------------------------------
  const handleGenerateEmails = (overrideParams = null, saveHistory = true) => {
    const params = overrideParams || {
      brandName,
      productName,
      industry,
      goal,
      offer,
      tone
    };

    if (!params.productName.trim() || !params.brandName.trim()) {
      triggerToast(
        'Vui lòng nhập Tên sản phẩm & Thương hiệu!',
        'Smart Matcher cần Tên sản phẩm để phân tích Regex và gán ảnh + thông số.'
      );
      return;
    }

    setIsGenerating(true);
    setTimeout(() => {
      const generated = buildThreeRichVariants(params);
      setVariants(generated);
      if (saveHistory) {
        saveCampaignToHistory(params, generated);
      }
      setIsGenerating(false);
      triggerToast(
        `Smart Matcher đã gán Ảnh & Thông số cho "${params.productName}"!`,
        `Danh mục: ${generated[0].categoryName} • Đã tạo 3 mẫu Email + Bảng so sánh.`
      );
    }, 380);
  };

  // Đổi mục tiêu chiến dịch (Ra mắt / Khuyến mãi / Chăm sóc KH) -> Tự động viết lại cả ô Offer và 3 mẫu Email
  const handleSelectGoal = (newGoalId) => {
    setGoal(newGoalId);
    const autoRewrittenOffer = generateGoalSpecificOfferText(
      newGoalId,
      productName,
      brandName,
      offer
    );
    setOffer(autoRewrittenOffer);

    const updatedVariants = buildThreeRichVariants({
      brandName,
      productName,
      industry,
      goal: newGoalId,
      offer: autoRewrittenOffer,
      tone
    });
    setVariants(updatedVariants);

    const goalObj = GOALS.find((g) => g.id === newGoalId);
    triggerToast(
      `Đã đổi sang "${goalObj?.label}" & Tự viết lại Nội dung ưu đãi!`,
      newGoalId === 'launch'
        ? 'Ô ưu đãi & Email đã chuyển sang văn phong Công bố sản phẩm mới & Đặt trước.'
        : newGoalId === 'promo'
        ? 'Ô ưu đãi & Email đã chuyển sang văn phong Flash Sale, Trợ giá & Freeship.'
        : 'Ô ưu đãi & Email đã chuyển sang văn phong Tri ân VIP, Hậu mãi & Chăm sóc 1-1.'
    );
  };

  // Đổi tông giọng tức thì nhưng giữ nguyên các thông số / ảnh mà người dùng đã chỉnh
  const handleSwitchTone = (newToneId) => {
    setTone(newToneId);
    const freshToneVariants = buildThreeRichVariants({
      brandName,
      productName,
      industry,
      goal,
      offer,
      tone: newToneId
    });

    setVariants((prev) =>
      freshToneVariants.map((freshVar, idx) => {
        const existing = prev[idx];
        if (!existing) return freshVar;
        return {
          ...freshVar,
          imageUrl: existing.imageUrl,
          imageBadge: existing.imageBadge,
          oldPrice: existing.oldPrice,
          newPrice: existing.newPrice,
          kpis: existing.kpis,
          comparisonRows: existing.comparisonRows
        };
      })
    );

    const toneObj = TONES.find((t) => t.id === newToneId);
    triggerToast(
      `Đã viết lại theo tông: ${toneObj?.emoji} ${toneObj?.label}`,
      'Giữ nguyên hình ảnh, thẻ KPI và bảng so sánh của sản phẩm.'
    );
  };

  // Nạp kịch bản Demo xoay vòng
  const handleLoadQuickDemo = () => {
    const nextIdx = (presetIndex + 1) % DEMO_PRESETS.length;
    setPresetIndex(nextIdx);
    const preset = DEMO_PRESETS[nextIdx];
    setBrandName(preset.brandName);
    setProductName(preset.productName);
    setIndustry(preset.industry);
    setGoal(preset.goal);
    setOffer(preset.offer);
    setTone(preset.tone);
    handleGenerateEmails(preset, true);
  };

  // --------------------------------------------------------------------------
  // CÁC HÀM TỰ CHỈNH THÔNG SỐ THỦ CÔNG (MANUAL OVERRIDE)
  // --------------------------------------------------------------------------
  const updateCurrentVariant = (updater) => {
    setVariants((prev) =>
      prev.map((item, idx) =>
        idx === activeVariantIdx
          ? typeof updater === 'function'
            ? updater(item)
            : { ...item, ...updater }
          : item
      )
    );
  };

  const handleUpdateKpi = (kpiIndex, field, value) => {
    updateCurrentVariant((v) => {
      const nextKpis = v.kpis.map((k, i) =>
        i === kpiIndex ? { ...k, [field]: value } : k
      );
      return { ...v, kpis: nextKpis };
    });
  };

  const handleUpdateComparisonRow = (rowIndex, field, value) => {
    updateCurrentVariant((v) => {
      const nextRows = v.comparisonRows.map((r, i) =>
        i === rowIndex ? { ...r, [field]: value } : r
      );
      return { ...v, comparisonRows: nextRows };
    });
  };

  // --------------------------------------------------------------------------
  // COPY TOÀN BỘ EMAIL HOẶC MÃ HTML GIÀU HÌNH ẢNH + KPI + BẢNG SO SÁNH
  // --------------------------------------------------------------------------
  const handleCopyVariant = (mode = 'full') => {
    if (!currentVariant) return;

    if (mode === 'subject') {
      copyToClipboardSafe(currentVariant.subject);
      triggerToast('Đã sao chép Subject Line!', currentVariant.subject);
      return;
    }

    if (mode === 'html') {
      const htmlCode = `<!-- Rich HTML Marketing Email generated by AetherMail AI -->
<div style="max-width:680px;margin:0 auto;font-family:'Inter',Arial,sans-serif;background:#ffffff;border:1px solid #e2e8f0;border-radius:18px;overflow:hidden;color:#1e293b;">
  <!-- Header Banner -->
  <div style="background:linear-gradient(135deg,#1d4ed8 0%,#4f46e5 50%,#a855f7 100%);padding:28px 32px;color:#ffffff;">
    <div style="display:inline-block;background:rgba(255,255,255,0.2);padding:5px 12px;border-radius:999px;font-size:11px;font-weight:800;letter-spacing:0.8px;margin-bottom:12px;">
      ${currentVariant.headerBadge}
    </div>
    <h1 style="margin:0;font-size:24px;line-height:1.35;font-weight:800;">
      ${currentVariant.bannerHeadline}
    </h1>
  </div>

  <div style="padding:28px 32px;">
    <p style="font-size:15px;font-weight:700;color:#0f172a;margin:0 0 12px;">${currentVariant.greeting}</p>
    <p style="font-size:14px;line-height:1.65;color:#475569;margin:0 0 22px;">${currentVariant.intro}</p>

    <!-- Product Hero Card -->
    <div style="position:relative;border-radius:16px;overflow:hidden;margin-bottom:24px;background:#0f172a;">
      <img src="${currentVariant.imageUrl}" alt="${currentVariant.productName}" style="width:100%;height:280px;object-fit:cover;display:block;opacity:0.9;" />
      <div style="padding:18px 22px;background:#0f172a;color:#ffffff;display:flex;justify-content:space-between;align-items:center;">
        <div>
          <div style="font-size:12px;color:#38bdf8;font-weight:700;">${currentVariant.brandName}</div>
          <div style="font-size:20px;font-weight:800;">${currentVariant.productName}</div>
        </div>
        <div style="text-align:right;background:rgba(15,23,42,0.9);border:1px solid #334155;padding:8px 14px;border-radius:12px;">
          <div style="font-size:11px;color:#94a3b8;text-decoration:line-through;">${currentVariant.oldPrice}</div>
          <div style="font-size:16px;font-weight:800;color:#4ade80;">${currentVariant.newPrice}</div>
        </div>
      </div>
    </div>

    <!-- 3 KPI Cards -->
    <div style="font-size:12px;font-weight:800;color:#2563eb;text-transform:uppercase;margin-bottom:10px;">
      📊 THÔNG SỐ & SỐ LIỆU NỔI BẬT (${currentVariant.productName.toUpperCase()}):
    </div>
    <table width="100%" cellPadding="0" cellSpacing="0" style="margin-bottom:24px;">
      <tr>
        ${currentVariant.kpis
          .map(
            (k) => `<td width="32%" style="border:1px solid #e2e8f0;border-radius:12px;padding:14px 10px;text-align:center;background:#f8fafc;">
          <div style="font-size:18px;font-weight:800;color:#2563eb;">${k.value}</div>
          <div style="font-size:12px;font-weight:700;color:#1e293b;margin-top:4px;">${k.title}</div>
          <div style="font-size:11px;color:#64748b;margin-top:2px;">${k.sub}</div>
        </td>`
          )
          .join('<td width="2%"></td>')}
      </tr>
    </table>

    <!-- Offer Box -->
    <div style="background:#eff6ff;border-left:4px solid #3b82f6;border-radius:12px;padding:18px 20px;margin-bottom:24px;">
      <div style="font-size:12px;font-weight:800;color:#1d4ed8;margin-bottom:6px;">📌 ${currentVariant.offerBoxTitle}</div>
      <div style="font-size:13.5px;line-height:1.65;color:#1e293b;">${currentVariant.offerHighlight}</div>
    </div>

    <!-- Comparison Table -->
    <div style="font-size:12px;font-weight:800;color:#2563eb;text-transform:uppercase;margin-bottom:10px;">
      📋 BẢNG SO SÁNH THÔNG SỐ & QUYỀN LỢI:
    </div>
    <table width="100%" cellPadding="12" cellSpacing="0" style="border:1px solid #e2e8f0;border-radius:12px;border-collapse: collapse;margin-bottom:22px;font-size:13px;">
      <tr style="background:#f1f5f9;text-align:left;color:#334155;font-weight:700;">
        <th style="border-bottom:1px solid #e2e8f0;">${currentVariant.tableHeaders[0]}</th>
        <th style="border-bottom:1px solid #e2e8f0;">${currentVariant.tableHeaders[1]}</th>
        <th style="border-bottom:1px solid #e2e8f0;">${currentVariant.tableHeaders[2]}</th>
      </tr>
      ${currentVariant.comparisonRows
        .map(
          (r) => `<tr>
        <td style="border-bottom:1px solid #f1f5f9;font-weight:700;color:#1e293b;">${r.feature}</td>
        <td style="border-bottom:1px solid #f1f5f9;color:#64748b;">${r.standard}</td>
        <td style="border-bottom:1px solid #f1f5f9;font-weight:700;color:#2563eb;">✓ ${r.upgrade}</td>
      </tr>`
        )
        .join('')}
    </table>

    <!-- CTA Button -->
    <div style="text-align:center;margin:28px 0 20px;">
      <a href="#" style="display:inline-block;background:linear-gradient(90deg,#2563eb 0%,#7c3aed 50%,#c026d3 100%);color:#ffffff;font-weight:800;font-size:14px;padding:15px 34px;border-radius:12px;text-decoration:none;">
        ${currentVariant.cta} →
      </a>
    </div>
  </div>
</div>`;
      copyToClipboardSafe(htmlCode);
      triggerToast(
        'Đã sao chép mã HTML Email đầy đủ!',
        'Bao gồm Ảnh sản phẩm, 3 Thẻ KPI, Bảng so sánh và Nút CTA.'
      );
      return;
    }

    const fullText = `TIÊU ĐỀ (SUBJECT): ${currentVariant.subject}
BANNER: ${currentVariant.bannerHeadline}

${currentVariant.greeting}
${currentVariant.intro}

[SẢN PHẨM]: ${currentVariant.productName} (${currentVariant.brandName})
[GIÁ ƯU ĐÃI]: ${currentVariant.newPrice} (Giá gốc: ${currentVariant.oldPrice})

📊 THÔNG SỐ & SỐ LIỆU NỔI BẬT:
${currentVariant.kpis.map((k) => `- ${k.value} | ${k.title} (${k.sub})`).join('\n')}

📌 ${currentVariant.offerBoxTitle}
${currentVariant.offerHighlight}

📋 BẢNG SO SÁNH THÔNG SỐ & QUYỀN LỢI:
${currentVariant.comparisonRows
  .map((r) => `• ${r.feature}: [Thông thường: ${r.standard}] ➔ [Đột phá: ✓ ${r.upgrade}]`)
  .join('\n')}

👉 NÚT CTA: [ ${currentVariant.cta} → ]`;

    copyToClipboardSafe(fullText);
    triggerToast(
      `Đã sao chép toàn bộ ${currentVariant.name}!`,
      'Bao gồm Subject, 3 Thẻ KPI, Bảng so sánh và Nút CTA.'
    );
  };

  // Bảng màu theo 2 phong cách Dark Cosmic & Celestial Gold
  const themeStyles = {
    pageBg: isDark
      ? 'bg-[#080412] text-[#F8F5FF]'
      : 'bg-[#FAF6EE] text-[#1C1917]',
    cardSurface: isDark
      ? 'bg-[#130B24]/90 backdrop-blur-xl border border-[#2D1B4E] shadow-[0_12px_40px_rgba(0,0,0,0.65)]'
      : 'bg-white/95 backdrop-blur-md border border-[#E6D29E] shadow-[0_12px_35px_rgba(197,155,39,0.12)]',
    inputSurface: isDark
      ? 'bg-[#0B0616] border-[#3B2363] text-[#F8F5FF] placeholder-[#6E5D8A] focus:border-[#FF2A54] focus:ring-1 focus:ring-[#FF2A54]'
      : 'bg-[#FCF9F2] border-[#DEC484] text-[#1C1917] placeholder-[#9C8D74] focus:border-[#5E43F3] focus:ring-1 focus:ring-[#5E43F3]',
    primaryBtn: isDark
      ? 'bg-gradient-to-r from-[#FF2A54] via-[#FF5E36] to-[#9333EA] text-white shadow-[0_0_25px_rgba(255,42,84,0.45)] hover:brightness-110'
      : 'bg-gradient-to-r from-[#C59B27] via-[#D4AF37] to-[#5E43F3] text-white shadow-[0_8px_24px_rgba(197,155,39,0.38)] hover:brightness-105',
    secondaryBtn: isDark
      ? 'bg-[#1D1136] hover:bg-[#281847] text-[#E9D5FF] border border-[#3B2363]'
      : 'bg-[#F7EFE0] hover:bg-[#EFE2C6] text-[#5C4418] border border-[#E2C98A]',
    mutedText: isDark ? 'text-[#9E8FB2]' : 'text-[#6B5E4C]',
    accentText: isDark ? 'text-[#FF476E]' : 'text-[#B4831E]'
  };

  // CÁC HÀM HỖ TRỢ IN-LINE EDITING (SỬA TRỰC TIẾP TRÊN PREVIEW)
  const getEditProps = (field, index = null, subField = null) => {
    if (!isInlineEditing) return {};
    return {
      contentEditable: true,
      suppressContentEditableWarning: true,
      onBlur: (e) => {
        const text = e.currentTarget.innerText;
        if (index !== null) {
          if (field === 'kpis') handleUpdateKpi(index, subField, text);
          if (field === 'comparisonRows') handleUpdateComparisonRow(index, subField, text);
          if (field === 'tableHeaders') {
            updateCurrentVariant((v) => {
              const newHeaders = [...v.tableHeaders];
              newHeaders[index] = text;
              return { ...v, tableHeaders: newHeaders };
            });
          }
          if (field === 'trustBullets') {
            updateCurrentVariant((v) => {
              const newBullets = [...v.trustBullets];
              newBullets[index] = text;
              return { ...v, trustBullets: newBullets };
            });
          }
        } else {
          updateCurrentVariant({ [field]: text });
        }
      }
    };
  };

  const editClass = (isDarkBg = false) =>
    isInlineEditing
      ? `outline-dashed outline-[1.5px] cursor-text transition-all rounded-sm p-0.5 -m-0.5 relative z-10 hover:shadow-sm ${
          isDarkBg
            ? 'outline-white/70 hover:bg-white/20 focus:bg-white/20'
            : 'outline-blue-500/60 hover:bg-blue-50 focus:bg-blue-50'
        }`
      : '';

  return (
    <div
      className={`min-h-screen relative overflow-x-hidden transition-colors duration-500 font-sans ${themeStyles.pageBg}`}
    >
      {/* HẬU CẢNH NGHỆ THUẬT */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        {isDark ? (
          <>
            <div className="absolute -top-32 -left-24 w-[520px] h-[520px] rounded-full bg-[#581C87]/30 blur-[135px]" />
            <div className="absolute top-1/4 -right-28 w-[500px] h-[500px] rounded-full bg-[#9F1239]/25 blur-[140px]" />
            <div className="absolute -bottom-32 left-1/3 w-[460px] h-[460px] rounded-full bg-[#7E22CE]/20 blur-[130px]" />
          </>
        ) : (
          <>
            <div className="absolute -top-28 left-1/4 w-[560px] h-[560px] rounded-full bg-[#F3E5AB]/60 blur-[125px]" />
            <div className="absolute top-1/3 -right-20 w-[460px] h-[460px] rounded-full bg-[#DDD6FE]/60 blur-[125px]" />
            <div className="absolute -bottom-24 -left-20 w-[480px] h-[480px] rounded-full bg-[#FDE68A]/45 blur-[130px]" />
          </>
        )}
      </div>

      {/* TOP NAVBAR */}
      <header
        className={`sticky top-0 z-30 border-b transition-colors duration-500 ${
          isDark
            ? 'bg-[#0A0518]/90 border-[#2D1B4E] backdrop-blur-xl'
            : 'bg-[#FAF6EE]/90 border-[#E6D29E] backdrop-blur-xl'
        }`}
      >
        <div className="max-w-[1460px] mx-auto px-4 sm:px-6 py-3 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div
              className={`w-11 h-11 rounded-2xl flex items-center justify-center shadow-lg ${
                isDark
                  ? 'bg-gradient-to-br from-[#FF2A54] via-[#FF5E36] to-[#9333EA] shadow-[#FF2A54]/30'
                  : 'bg-gradient-to-br from-[#C59B27] via-[#E5C158] to-[#5E43F3] shadow-[#C59B27]/30'
              }`}
            >
              <Mail className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-extrabold text-lg sm:text-xl tracking-tight">
                  AetherMail <span className={themeStyles.accentText}>AI</span>
                </h1>
                <span
                  className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${
                    isDark
                      ? 'bg-[#FF2A54]/15 border-[#FF2A54]/40 text-[#FF758F]'
                      : 'bg-[#5E43F3]/10 border-[#5E43F3]/30 text-[#5E43F3]'
                  }`}
                >
                  SMART MATCHER ENGINE 2.0
                </span>
              </div>
              <p className={`text-xs ${themeStyles.mutedText}`}>
                Tự động phân tích từ khóa Sản phẩm ➔ Gán Ảnh thực tế, Thẻ KPI, Bảng so sánh & Nút CTA
              </p>
            </div>
          </div>

          <div className="flex items-center flex-wrap gap-2">
            <button
              onClick={handleLoadQuickDemo}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all active:scale-95 ${themeStyles.secondaryBtn}`}
            >
              <Zap
                className={`w-3.5 h-3.5 ${
                  isDark ? 'text-[#FF5E36]' : 'text-[#C59B27]'
                }`}
              />
              <span>Đổi Kịch Bản Mẫu ({presetIndex + 1}/{DEMO_PRESETS.length})</span>
            </button>

            <button
              onClick={() => setShowHistoryModal(true)}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all ${themeStyles.secondaryBtn}`}
            >
              <History className="w-3.5 h-3.5" />
              <span>Lịch sử ({historyList.length})</span>
            </button>

            <button
              onClick={() =>
                setTheme(isDark ? 'light' : 'dark')
              }
              className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-2 border transition-all duration-300 shadow-sm ${
                isDark
                  ? 'bg-gradient-to-r from-[#251042] to-[#3D1030] border-[#FF2A54]/50 text-[#FFD1DC] hover:border-[#FF2A54]'
                  : 'bg-gradient-to-r from-[#FFF8E7] to-[#EFECE6] border-[#C59B27] text-[#6E4F12] hover:bg-[#F7E8C4]'
              }`}
            >
              {isDark ? (
                <>
                  <Moon className="w-3.5 h-3.5 text-[#FF2A54]" />
                  <span>Dark Mode</span>
                </>
              ) : (
                <>
                  <Sun className="w-3.5 h-3.5 text-[#C59B27]" />
                  <span>Light Mode</span>
                </>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* THANH TRẠNG THÁI PIPELINE TỰ ĐỘNG */}
      <div className="relative z-10 max-w-[1460px] mx-auto px-4 sm:px-6 pt-4">
        <div
          className={`rounded-2xl px-4 py-3 border flex flex-wrap items-center justify-between gap-2 text-xs ${
            isDark
              ? 'bg-[#120924]/90 border-[#3B2363] text-[#E9D5FF]'
              : 'bg-white/90 border-[#DEC484] text-[#44403C]'
          }`}
        >
          <div className="flex items-center flex-wrap gap-2">
            <span className="font-extrabold flex items-center gap-1.5 text-emerald-400">
              <Cpu className="w-4 h-4" />
              <span>Luồng Smart Matcher:</span>
            </span>
            <span
              className={`px-2.5 py-1 rounded-lg font-bold ${
                isDark ? 'bg-[#1F1238]' : 'bg-[#F5EFE0]'
              }`}
            >
              1. Sản phẩm: "{productName || '...'}"
            </span>
            <ArrowRight className="w-3.5 h-3.5 opacity-60" />
            <span
              className={`px-2.5 py-1 rounded-lg font-semibold ${
                isDark ? 'bg-[#1F1238] text-[#FF758F]' : 'bg-[#EFECE6] text-[#5E43F3]'
              }`}
            >
              2. Regex khớp: [{liveMatcherPreview.matchedKeywords.join(', ')}]
            </span>
            <ArrowRight className="w-3.5 h-3.5 opacity-60" />
            <span className="px-2.5 py-1 rounded-lg font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
              ✓ 3. Đã gán Ảnh + 3 KPI + Bảng So Sánh ({liveMatcherPreview.categoryName})
            </span>
          </div>

          <button
            type="button"
            onClick={() => setShowManualSpecEditor(!showManualSpecEditor)}
            className={`px-3 py-1.5 rounded-xl font-bold text-xs flex items-center gap-1.5 border transition-all ${
              showManualSpecEditor
                ? 'bg-emerald-600 text-white border-emerald-500'
                : isDark
                ? 'bg-[#FF2A54]/20 border-[#FF2A54] text-[#FF758F] hover:bg-[#FF2A54] hover:text-white'
                : 'bg-[#5E43F3]/15 border-[#5E43F3] text-[#5E43F3] hover:bg-[#5E43F3] hover:text-white'
            }`}
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>
              {showManualSpecEditor
                ? 'Đóng bảng tự chỉnh thông số'
                : '🛠️ Tự chỉnh Thông số, Ảnh & Bảng So Sánh'}
            </span>
          </button>
        </div>
      </div>

      {/* MAIN WORKSPACE */}
      <main className="relative z-10 max-w-[1460px] mx-auto px-4 sm:px-6 py-5">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* ================================================================
              CỘT TRÁI (5/12): FORM NHẬP SẢN PHẨM & AI DỰ BÁO GIỜ VÀNG
          ================================================================ */}
          <div className="lg:col-span-5 space-y-6">
            <section className={`rounded-3xl p-5 sm:p-6 ${themeStyles.cardSurface}`}>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2.5">
                  <div
                    className={`w-8 h-8 rounded-xl flex items-center justify-center ${
                      isDark
                        ? 'bg-[#FF2A54]/15 text-[#FF476E]'
                        : 'bg-[#C59B27]/15 text-[#B4831E]'
                    }`}
                  >
                    <Wand2 className="w-4 h-4" />
                  </div>
                  <div>
                    <h2 className="font-bold text-base">
                      Thiết lập Chiến dịch & Sản phẩm
                    </h2>
                    <p className={`text-xs ${themeStyles.mutedText}`}>
                      Gõ tên sản phẩm bất kỳ để Regex tự động nhận diện thông số
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                {/* Ô NHẬP TÊN SẢN PHẨM */}
                <div>
                  <label className="block text-xs font-bold mb-1.5 flex items-center justify-between">
                    <span className="flex items-center gap-1.5">
                      <Search className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Tên Sản Phẩm Chiến Dịch (Regex Tự Nhận Diện) *</span>
                    </span>
                    <span className="text-[11px] font-semibold text-emerald-400">
                      ✓ Tự gán Ảnh & KPI
                    </span>
                  </label>
                  <input
                    type="text"
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                    placeholder="VD: TV OLED 50 inch 4K AI, Laptop RTX, Giày chạy bộ..."
                    className={`w-full px-3.5 py-2.5 rounded-xl border text-sm font-bold outline-none transition-all ${themeStyles.inputSurface}`}
                  />

                  {/* Nút chọn nhanh sản phẩm để test Smart Matcher */}
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {QUICK_PRODUCT_CHIPS.map((item, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => {
                          const smartOfferByCurrentGoal = generateGoalSpecificOfferText(
                            goal,
                            item.product,
                            item.brand,
                            item.offer
                          );
                          setBrandName(item.brand);
                          setProductName(item.product);
                          setIndustry(item.industry);
                          setOffer(smartOfferByCurrentGoal);
                          handleGenerateEmails(
                            {
                              brandName: item.brand,
                              productName: item.product,
                              industry: item.industry,
                              goal,
                              offer: smartOfferByCurrentGoal,
                              tone
                            },
                            true
                          );
                        }}
                        className={`text-[11px] px-2.5 py-1 rounded-lg border font-semibold transition-all ${
                          isDark
                            ? 'bg-[#1A0F30] border-[#3B2363] text-[#C4B5FD] hover:border-[#FF2A54] hover:text-white'
                            : 'bg-[#F8F1E0] border-[#DEC484] text-[#6E4F12] hover:border-[#5E43F3] hover:text-[#5E43F3]'
                        }`}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Tên thương hiệu & Ngành hàng */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-xs font-semibold mb-1.5 flex items-center gap-1.5">
                      <Building2 className="w-3.5 h-3.5 opacity-75" />
                      <span>Tên thương hiệu *</span>
                    </label>
                    <input
                      type="text"
                      value={brandName}
                      onChange={(e) => setBrandName(e.target.value)}
                      placeholder="VD: Sony Bravia VN..."
                      className={`w-full px-3.5 py-2.5 rounded-xl border text-sm outline-none transition-all ${themeStyles.inputSurface}`}
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold mb-1.5 flex items-center gap-1.5">
                      <Layers className="w-3.5 h-3.5 opacity-75" />
                      <span>Ngành hàng</span>
                    </label>
                    <select
                      value={industry}
                      onChange={(e) => setIndustry(e.target.value)}
                      className={`w-full px-3 py-2.5 rounded-xl border text-sm outline-none transition-all ${themeStyles.inputSurface}`}
                    >
                      {INDUSTRIES.map((ind) => (
                        <option
                          key={ind.id}
                          value={ind.id}
                          className={
                            isDark
                              ? 'bg-[#130B24] text-white'
                              : 'bg-white text-stone-900'
                          }
                        >
                          {ind.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Mục tiêu chiến dịch */}
                <div>
                  <label className="block text-xs font-semibold mb-2">
                    Mục tiêu chiến dịch *
                  </label>
                  <div className="grid grid-cols-3 gap-2.5">
                    {GOALS.map((g) => {
                      const isSelected = goal === g.id;
                      const iconColorClass = isSelected
                        ? isDark
                          ? 'w-4 h-4 text-[#FF476E]'
                          : 'w-4 h-4 text-[#B4831E]'
                        : 'w-4 h-4 opacity-60';
                      return (
                        <button
                          key={g.id}
                          type="button"
                          onClick={() => handleSelectGoal(g.id)}
                          className={`p-3 rounded-2xl border text-left transition-all flex flex-col justify-between gap-2 ${
                            isSelected
                              ? isDark
                                ? 'bg-gradient-to-br from-[#FF2A54]/20 to-[#9333EA]/20 border-[#FF2A54] text-white shadow-[0_0_18px_rgba(255,42,84,0.28)]'
                                : 'bg-gradient-to-br from-[#C59B27]/20 to-[#5E43F3]/15 border-[#C59B27] text-[#1C1917]'
                              : isDark
                              ? 'bg-[#0B0616]/80 border-[#2D1B4E] text-[#9E8FB2] hover:border-[#4C2E85]'
                              : 'bg-[#FCF9F2] border-[#E6D29E] text-[#6B5E4C] hover:border-[#C59B27]'
                          }`}
                        >
                          <div className="flex items-center justify-between w-full">
                            {renderGoalIcon(g.iconName, iconColorClass)}
                            {isSelected && (
                              <span
                                className={`w-2 h-2 rounded-full ${
                                  isDark ? 'bg-[#FF2A54]' : 'bg-[#5E43F3]'
                                }`}
                              />
                            )}
                          </div>
                          <span className="text-xs font-bold leading-tight">
                            {g.label}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Nội dung ưu đãi */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-xs font-semibold flex items-center gap-1.5">
                      <Tag className="w-3.5 h-3.5 opacity-75" />
                      <span>Nội dung chương trình & Ưu đãi (Có thể ghi % giảm) *</span>
                    </label>
                  </div>
                  <textarea
                    rows={3}
                    value={offer}
                    onChange={(e) => setOffer(e.target.value)}
                    placeholder="VD: Giảm ngay 33%, tặng kèm Loa Soundbar không dây trị giá 3.500.000đ..."
                    className={`w-full px-3.5 py-2.5 rounded-2xl border text-sm outline-none transition-all resize-none leading-relaxed ${themeStyles.inputSurface}`}
                  />
                </div>

                {/* Nút Bấm Phân Tích & Tạo 03 Mẫu Email */}
                <button
                  type="button"
                  onClick={() => handleGenerateEmails()}
                  disabled={isGenerating}
                  className={`w-full py-3.5 px-5 rounded-2xl font-extrabold text-sm flex items-center justify-center gap-2.5 transition-all active:scale-[0.99] disabled:opacity-60 ${themeStyles.primaryBtn}`}
                >
                  {isGenerating ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>Đang khớp Regex & Tạo bảng thông số...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4" />
                      <span>Phân Tích Sản Phẩm & Tạo 03 Mẫu Email Ngay</span>
                    </>
                  )}
                </button>
              </div>
            </section>

            {/* KHỐI 2: AI GỢI Ý THỜI ĐIỂM GỬI TỐT NHẤT */}
            <section
              className={`rounded-3xl p-5 sm:p-6 relative overflow-hidden ${themeStyles.cardSurface}`}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2.5">
                  <div
                    className={`w-8 h-8 rounded-xl flex items-center justify-center ${
                      isDark
                        ? 'bg-[#9333EA]/20 text-[#D8B4FE]'
                        : 'bg-[#5E43F3]/15 text-[#5E43F3]'
                    }`}
                  >
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <h2 className="font-bold text-base">
                      AI Gợi ý Thời điểm Gửi Tốt Nhất
                    </h2>
                    <p className={`text-xs ${themeStyles.mutedText}`}>
                      Tối ưu theo ngành {currentIndustryObj.name}
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                <div
                  className={`p-3.5 rounded-2xl border ${
                    isDark
                      ? 'bg-[#190E30]/90 border-[#3B2363]'
                      : 'bg-gradient-to-br from-[#FFFDF9] to-[#F7EFE0] border-[#DEC484]'
                  }`}
                >
                  <div
                    className={`text-[11px] font-semibold flex items-center gap-1.5 mb-1 ${themeStyles.mutedText}`}
                  >
                    <Clock className="w-3.5 h-3.5" />
                    <span>KHUNG GIỜ VÀNG</span>
                  </div>
                  <div
                    className={`text-sm font-extrabold ${
                      isDark ? 'text-[#FF758F]' : 'text-[#8C6218]'
                    }`}
                  >
                    {currentSendTimeInfo.window}
                  </div>
                </div>

                <div
                  className={`p-3.5 rounded-2xl border ${
                    isDark
                      ? 'bg-[#190E30]/90 border-[#3B2363]'
                      : 'bg-gradient-to-br from-[#FFFDF9] to-[#F7EFE0] border-[#DEC484]'
                  }`}
                >
                  <div
                    className={`text-[11px] font-semibold flex items-center gap-1.5 mb-1 ${themeStyles.mutedText}`}
                  >
                    <Calendar className="w-3.5 h-3.5" />
                    <span>NGÀY GỬI TỐI ƯU</span>
                  </div>
                  <div
                    className={`text-sm font-extrabold ${
                      isDark ? 'text-[#D8B4FE]' : 'text-[#5E43F3]'
                    }`}
                  >
                    {currentSendTimeInfo.days}
                  </div>
                </div>
              </div>

              <div className="mb-3">
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <span className="font-semibold flex items-center gap-1.5">
                    <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Tỷ lệ mở thư dự kiến (Open Rate)</span>
                  </span>
                  <span className="font-extrabold text-emerald-400">
                    {currentSendTimeInfo.openRate}% (CTR ~{currentSendTimeInfo.ctr}%)
                  </span>
                </div>
                <div
                  className={`w-full h-2 rounded-full overflow-hidden ${
                    isDark ? 'bg-[#0B0616]' : 'bg-[#E6D29E]/50'
                  }`}
                >
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      isDark
                        ? 'bg-gradient-to-r from-[#FF2A54] via-[#FF5E36] to-[#A855F7]'
                        : 'bg-gradient-to-r from-[#C59B27] via-[#E5C158] to-[#5E43F3]'
                    }`}
                    style={{
                      width: `${Math.min(100, currentSendTimeInfo.openRate * 1.9)}%`
                    }}
                  />
                </div>
              </div>

              <div
                className={`p-3 rounded-2xl border text-xs leading-relaxed flex items-start gap-2.5 ${
                  isDark
                    ? 'bg-[#0E071D] border-[#2D1B4E] text-[#D3C4E8]'
                    : 'bg-[#FAF3E3] border-[#E6D29E] text-[#5C4418]'
                }`}
              >
                <Award
                  className={`w-4 h-4 shrink-0 mt-0.5 ${
                    isDark ? 'text-[#FF5E36]' : 'text-[#C59B27]'
                  }`}
                />
                <div>{currentSendTimeInfo.reason}</div>
              </div>
            </section>
          </div>

          {/* ================================================================
              CỘT PHẢI (7/12): CHỌN 03 MẪU, BẢNG TỰ CHỈNH THÔNG SỐ & PREVIEW THẬT
          ================================================================ */}
          <div className="lg:col-span-7 space-y-5">
            {/* THANH CÔNG CỤ CHỌN 03 MẪU + ĐỔI TÔNG GIỌNG + NÚT TỰ CHỈNH THỦ CÔNG */}
            <section className={`rounded-3xl p-5 ${themeStyles.cardSurface}`}>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 mb-4">
                {variants.map((v, idx) => {
                  const isActive = activeVariantIdx === idx;
                  return (
                    <button
                      key={v.id}
                      type="button"
                      onClick={() => setActiveVariantIdx(idx)}
                      className={`p-3.5 rounded-2xl border text-left transition-all ${
                        isActive
                          ? isDark
                            ? 'bg-gradient-to-br from-[#FF2A54]/20 via-[#FF5E36]/15 to-[#9333EA]/25 border-[#FF2A54] text-white shadow-[0_0_20px_rgba(255,42,84,0.3)]'
                            : 'bg-gradient-to-br from-[#C59B27]/20 via-[#F5E6C4]/50 to-[#5E43F3]/15 border-[#C59B27] text-[#1C1917]'
                          : isDark
                          ? 'bg-[#0B0616]/80 border-[#2D1B4E] text-[#9E8FB2] hover:border-[#4C2E85]'
                          : 'bg-[#FCF9F2] border-[#E6D29E] text-[#6B5E4C] hover:border-[#C59B27]'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-extrabold">{v.name}</span>
                        {isActive && (
                          <CheckCircle2
                            className={`w-4 h-4 shrink-0 ${
                              isDark ? 'text-[#FF476E]' : 'text-[#5E43F3]'
                            }`}
                          />
                        )}
                      </div>
                      <p className="text-[11px] opacity-80 truncate">
                        {v.strategy}
                      </p>
                    </button>
                  );
                })}
              </div>

              {/* Thanh Viết lại theo tông khác */}
              <div
                className={`p-3 rounded-2xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                  isDark
                    ? 'bg-[#0B0616]/90 border-[#2D1B4E]'
                    : 'bg-[#FCF9F2] border-[#E6D29E]'
                }`}
              >
                <div className="text-xs font-bold flex items-center gap-1.5">
                  <RefreshCw
                    className={`w-3.5 h-3.5 ${
                      isDark ? 'text-[#FF476E]' : 'text-[#5E43F3]'
                    }`}
                  />
                  <span>Viết lại theo tông khác:</span>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  {TONES.map((t) => {
                    const isSelectedTone = tone === t.id;
                    return (
                      <button
                        key={t.id}
                        type="button"
                        onClick={() => handleSwitchTone(t.id)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 border transition-all active:scale-95 ${
                          isSelectedTone
                            ? isDark
                              ? 'bg-[#FF2A54] border-[#FF2A54] text-white'
                              : 'bg-[#5E43F3] border-[#5E43F3] text-white'
                            : isDark
                            ? 'bg-[#170D2B] border-[#3B2363] text-[#D8B4FE] hover:border-[#FF2A54]'
                            : 'bg-white border-[#DEC484] text-[#5C4418] hover:border-[#5E43F3]'
                        }`}
                      >
                        <span>{t.emoji}</span>
                        <span>{t.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Hàng Nút Copy & Nút Tự Chỉnh Thông Số Thủ Công */}
              <div className="mt-4 flex flex-wrap items-center justify-between gap-2 pt-3 border-t border-dashed border-current/10">
                <div className="flex items-center flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => handleCopyVariant('full')}
                    className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all active:scale-95 ${themeStyles.primaryBtn}`}
                  >
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Mẫu Này</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleCopyVariant('subject')}
                    className={`px-3 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all ${themeStyles.secondaryBtn}`}
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span>Copy Subject</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleCopyVariant('html')}
                    className={`px-3 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all ${themeStyles.secondaryBtn}`}
                  >
                    <Code className="w-3.5 h-3.5" />
                    <span>Copy HTML</span>
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => setShowManualSpecEditor(!showManualSpecEditor)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-extrabold flex items-center gap-1.5 border transition-all ${
                    showManualSpecEditor
                      ? 'bg-emerald-600 text-white border-emerald-500 shadow-lg'
                      : isDark
                      ? 'bg-[#261447] border-[#A855F7] text-[#E9D5FF] hover:bg-[#351C63]'
                      : 'bg-[#EDE9FE] border-[#5E43F3] text-[#5E43F3] hover:bg-[#DDD6FE]'
                  }`}
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>
                    {showManualSpecEditor
                      ? '✓ Hoàn tất tự chỉnh'
                      : '⚙️ Tự chỉnh Thông số & Ảnh'}
                  </span>
                </button>
              </div>

              {/* ============================================================
                  BẢNG TỰ CHỈNH THÔNG SỐ, ẢNH, THẺ KPI & BẢNG SO SÁNH (THỦ CÔNG)
              ============================================================ */}
              {showManualSpecEditor && currentVariant && (
                <div
                  className={`mt-4 p-4 sm:p-5 rounded-2xl border space-y-5 transition-all ${
                    isDark
                      ? 'bg-[#0B0616] border-[#FF2A54]/60'
                      : 'bg-[#FCF9F2] border-[#5E43F3]/50'
                  }`}
                >
                  <div className="flex items-center justify-between border-b border-current/10 pb-2.5">
                    <div className="flex items-center gap-2">
                      <Sliders className="w-4 h-4 text-emerald-400" />
                      <h4 className="font-extrabold text-xs sm:text-sm uppercase tracking-wider">
                        Bảng Tự Chỉnh Thông Số Thủ Công ({currentVariant.name})
                      </h4>
                    </div>
                    <span className="text-[11px] text-emerald-400 font-semibold">
                      Sửa tới đâu ➔ Cập nhật Email tới đó
                    </span>
                  </div>

                  {/* 1. Chỉnh Tiêu đề, Ảnh, Giá & Nút CTA */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="sm:col-span-2">
                      <label className="block text-[11px] font-bold mb-1">
                        Tiêu đề Email (Subject Line):
                      </label>
                      <input
                        type="text"
                        value={currentVariant.subject}
                        onChange={(e) =>
                          updateCurrentVariant({ subject: e.target.value })
                        }
                        className={`w-full px-3 py-1.5 rounded-xl border text-xs font-bold ${themeStyles.inputSurface}`}
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold mb-1 flex items-center gap-1">
                        <ImageIcon className="w-3.5 h-3.5" />
                        <span>Link Ảnh Sản Phẩm (URL):</span>
                      </label>
                      <input
                        type="text"
                        value={currentVariant.imageUrl}
                        onChange={(e) =>
                          updateCurrentVariant({ imageUrl: e.target.value })
                        }
                        className={`w-full px-3 py-1.5 rounded-xl border text-xs ${themeStyles.inputSurface}`}
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold mb-1">
                        Nhãn góc trái trên ảnh (Badge):
                      </label>
                      <input
                        type="text"
                        value={currentVariant.imageBadge}
                        onChange={(e) =>
                          updateCurrentVariant({ imageBadge: e.target.value })
                        }
                        className={`w-full px-3 py-1.5 rounded-xl border text-xs font-bold ${themeStyles.inputSurface}`}
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold mb-1">
                        Giá gốc (Gạch ngang):
                      </label>
                      <input
                        type="text"
                        value={currentVariant.oldPrice}
                        onChange={(e) =>
                          updateCurrentVariant({ oldPrice: e.target.value })
                        }
                        className={`w-full px-3 py-1.5 rounded-xl border text-xs ${themeStyles.inputSurface}`}
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold mb-1">
                        Giá ưu đãi & % Giảm (Màu xanh lá):
                      </label>
                      <input
                        type="text"
                        value={currentVariant.newPrice}
                        onChange={(e) =>
                          updateCurrentVariant({ newPrice: e.target.value })
                        }
                        className={`w-full px-3 py-1.5 rounded-xl border text-xs font-bold text-emerald-400 ${themeStyles.inputSurface}`}
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-[11px] font-bold mb-1">
                        Chữ hiển thị trên Nút Kêu Gọi Hành Động (CTA Button):
                      </label>
                      <input
                        type="text"
                        value={currentVariant.cta}
                        onChange={(e) =>
                          updateCurrentVariant({ cta: e.target.value })
                        }
                        className={`w-full px-3 py-2 rounded-xl border text-xs font-extrabold ${themeStyles.inputSurface}`}
                      />
                    </div>
                  </div>

                  {/* 2. Chỉnh 3 Thẻ KPI Thông Số Nổi Bật */}
                  <div>
                    <div className="text-xs font-extrabold mb-2 flex items-center gap-1.5">
                      <BarChart3 className="w-3.5 h-3.5 text-blue-400" />
                      <span>Tự chỉnh 3 Thẻ KPI Thông Số Nổi Bật:</span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                      {currentVariant.kpis.map((kpi, kIdx) => (
                        <div
                          key={kIdx}
                          className={`p-2.5 rounded-xl border space-y-1.5 ${
                            isDark
                              ? 'bg-[#140B29] border-[#2D1B4E]'
                              : 'bg-white border-[#DEC484]'
                          }`}
                        >
                          <div className="text-[10px] font-bold opacity-70">
                            THẺ KPI #{kIdx + 1}
                          </div>
                          <input
                            type="text"
                            value={kpi.value}
                            onChange={(e) =>
                              handleUpdateKpi(kIdx, 'value', e.target.value)
                            }
                            placeholder="Số liệu lớn (VD: OLED 4K)"
                            className={`w-full px-2 py-1 rounded border text-xs font-extrabold ${themeStyles.inputSurface}`}
                          />
                          <input
                            type="text"
                            value={kpi.title}
                            onChange={(e) =>
                              handleUpdateKpi(kIdx, 'title', e.target.value)
                            }
                            placeholder="Tiêu đề (VD: Màn hình 50 inch)"
                            className={`w-full px-2 py-1 rounded border text-xs font-semibold ${themeStyles.inputSurface}`}
                          />
                          <input
                            type="text"
                            value={kpi.sub}
                            onChange={(e) =>
                              handleUpdateKpi(kIdx, 'sub', e.target.value)
                            }
                            placeholder="Mô tả phụ"
                            className={`w-full px-2 py-1 rounded border text-[11px] ${themeStyles.inputSurface}`}
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* 3. Chỉnh Bảng So Sánh 3 Dòng */}
                  <div>
                    <div className="text-xs font-extrabold mb-2 flex items-center gap-1.5">
                      <Table className="w-3.5 h-3.5 text-purple-400" />
                      <span>Tự chỉnh Bảng So Sánh Thông Số & Quyền Lợi:</span>
                    </div>
                    <div className="space-y-2">
                      {currentVariant.comparisonRows.map((row, rIdx) => (
                        <div
                          key={rIdx}
                          className="grid grid-cols-1 sm:grid-cols-3 gap-2"
                        >
                          <input
                            type="text"
                            value={row.feature}
                            onChange={(e) =>
                              handleUpdateComparisonRow(
                                rIdx,
                                'feature',
                                e.target.value
                              )
                            }
                            placeholder="Tiêu chí so sánh"
                            className={`px-2.5 py-1.5 rounded-lg border text-xs font-bold ${themeStyles.inputSurface}`}
                          />
                          <input
                            type="text"
                            value={row.standard}
                            onChange={(e) =>
                              handleUpdateComparisonRow(
                                rIdx,
                                'standard',
                                e.target.value
                              )
                            }
                            placeholder="Thế hệ thông thường"
                            className={`px-2.5 py-1.5 rounded-lg border text-xs ${themeStyles.inputSurface}`}
                          />
                          <input
                            type="text"
                            value={row.upgrade}
                            onChange={(e) =>
                              handleUpdateComparisonRow(
                                rIdx,
                                'upgrade',
                                e.target.value
                              )
                            }
                            placeholder="Đột phá trên Phiên bản Mới"
                            className={`px-2.5 py-1.5 rounded-lg border text-xs font-bold text-sky-400 ${themeStyles.inputSurface}`}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </section>

            {/* ==============================================================
                KHUNG PREVIEW HỘP THƯ THẬT
            ============================================================== */}
            <section className={`rounded-3xl p-4 sm:p-5 ${themeStyles.cardSurface}`}>
              {/* Thanh điều khiển Simulator Desktop / Mobile */}
              <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                  <h3 className="font-bold text-sm sm:text-base">
                    Khung Preview Hộp Thư Thực Tế (Rich HTML Email)
                  </h3>
                </div>

                <div className="flex items-center flex-wrap gap-2">
                  {/* Nút bật tắt chế độ sửa trực tiếp */}
                  <button
                    type="button"
                    onClick={() => setIsInlineEditing(!isInlineEditing)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shadow-sm ${
                      isInlineEditing
                        ? 'bg-emerald-500 text-white border border-emerald-400'
                        : isDark
                        ? 'bg-[#1D1136] text-[#E9D5FF] border border-[#3B2363] hover:bg-[#281847]'
                        : 'bg-[#F7EFE0] text-[#5C4418] border border-[#DEC484] hover:bg-[#EFE2C6]'
                    }`}
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                    <span>{isInlineEditing ? '✓ Đang Sửa Trực Tiếp' : 'Sửa Trực Tiếp'}</span>
                  </button>

                  <div
                    className={`p-1 rounded-xl border flex items-center gap-1 ${
                      isDark
                        ? 'bg-[#0B0616] border-[#2D1B4E]'
                        : 'bg-[#F4EBDC] border-[#DEC484]'
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => setDeviceView('desktop')}
                      className={`px-3 py-1.5 rounded-lg text-[11px] font-bold flex items-center gap-1.5 transition-all ${
                        deviceView === 'desktop'
                          ? isDark
                            ? 'bg-[#FF2A54] text-white'
                            : 'bg-[#C59B27] text-white'
                          : themeStyles.mutedText
                      }`}
                    >
                      <Monitor className="w-3.5 h-3.5" />
                      <span>Desktop</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setDeviceView('mobile')}
                      className={`px-3 py-1.5 rounded-lg text-[11px] font-bold flex items-center gap-1.5 transition-all ${
                        deviceView === 'mobile'
                          ? isDark
                            ? 'bg-[#FF2A54] text-white'
                            : 'bg-[#C59B27] text-white'
                          : themeStyles.mutedText
                      }`}
                    >
                      <Smartphone className="w-3.5 h-3.5" />
                      <span>Mobile</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Dòng xem trước ngoài Hộp thư đến (Gmail Row) */}
              <div
                className={`mb-4 px-3.5 py-2.5 rounded-2xl border flex items-center gap-3 text-xs ${
                  isDark
                    ? 'bg-[#0B0616] border-[#3B2363]'
                    : 'bg-white border-[#DEC484] shadow-sm'
                }`}
              >
                <button
                  type="button"
                  onClick={() => setIsStarred(!isStarred)}
                  className="focus:outline-none"
                >
                  <Star
                    className={`w-4 h-4 ${
                      isStarred
                        ? 'fill-amber-400 text-amber-400'
                        : 'opacity-40'
                    }`}
                  />
                </button>
                <span className="font-extrabold shrink-0 max-w-[140px] truncate">
                  {brandName}
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-500/15 text-blue-400 shrink-0">
                  Official
                </span>
                <div className="flex-1 truncate">
                  <span
                    {...getEditProps('subject')}
                    className={`font-bold ${editClass()}`}
                  >
                    {currentVariant?.subject}
                  </span>
                  <span className={`ml-1.5 ${themeStyles.mutedText}`}>
                    — <span {...getEditProps('intro')} className={editClass()}>{currentVariant?.intro}</span>
                  </span>
                </div>
                <span className="font-bold text-[11px] shrink-0 opacity-80">
                  {currentSendTimeInfo.window.split('-')[0].trim()}
                </span>
              </div>

              {/* KHUNG TRÌNH ĐỌC EMAIL */}
              <div
                className={`mx-auto transition-all duration-500 ${
                  deviceView === 'mobile' ? 'max-w-[400px]' : 'w-full'
                }`}
              >
                <div className="rounded-2xl overflow-hidden border border-slate-300 shadow-2xl bg-white text-slate-800">
                  {/* Thanh cửa sổ Hộp thư + Subject Header */}
                  <div className="bg-slate-100 px-4 py-2.5 border-b border-slate-200 flex items-center justify-between text-slate-600">
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full bg-[#FF5F56]" />
                      <span className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
                      <span className="w-3 h-3 rounded-full bg-[#27C93F]" />
                      <span
                        {...getEditProps('subject')}
                        className={`ml-2 text-[11px] font-bold text-slate-700 truncate max-w-[220px] sm:max-w-md block ${editClass()}`}
                      >
                        {currentVariant?.subject}
                      </span>
                    </div>
                    <div className="flex items-center gap-2.5 text-slate-500">
                      <Archive className="w-3.5 h-3.5 cursor-pointer hover:text-slate-800" />
                      <AlertOctagon className="w-3.5 h-3.5 cursor-pointer hover:text-slate-800" />
                      <Trash2 className="w-3.5 h-3.5 cursor-pointer hover:text-slate-800" />
                      <Reply className="w-3.5 h-3.5 cursor-pointer hover:text-slate-800" />
                      <MoreVertical className="w-3.5 h-3.5 cursor-pointer hover:text-slate-800" />
                    </div>
                  </div>

                  {/* NỘI DUNG BỨC THƯ */}
                  {isGenerating ? (
                    <div className="p-8 space-y-5 animate-pulse bg-white">
                      <div className="h-28 rounded-2xl bg-slate-200" />
                      <div className="h-64 rounded-2xl bg-slate-200" />
                      <div className="grid grid-cols-3 gap-3">
                        <div className="h-20 rounded-xl bg-slate-200" />
                        <div className="h-20 rounded-xl bg-slate-200" />
                        <div className="h-20 rounded-xl bg-slate-200" />
                      </div>
                      <div className="h-32 rounded-xl bg-slate-200" />
                    </div>
                  ) : (
                    <div className="bg-white text-slate-800">
                      {/* 1. BANNER GRADIENT ĐẦU THƯ */}
                      <div className="bg-gradient-to-r from-[#1D4ED8] via-[#4F46E5] to-[#A855F7] px-6 sm:px-8 py-7 text-white">
                        <div
                          {...getEditProps('headerBadge')}
                          className={`inline-block px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm text-[10px] font-extrabold tracking-wider uppercase mb-3 ${editClass(true)}`}
                        >
                          {currentVariant?.headerBadge}
                        </div>
                        <h2
                          {...getEditProps('bannerHeadline')}
                          className={`text-xl sm:text-2xl font-extrabold leading-snug tracking-tight ${editClass(true)}`}
                        >
                          {currentVariant?.bannerHeadline}
                        </h2>
                      </div>

                      {/* PHẦN THÂN EMAIL */}
                      <div className="p-5 sm:p-8 space-y-6">
                        {/* 2. LỜI CHÀO & ĐOẠN MỞ ĐẦU */}
                        <div className="space-y-2.5">
                          <p
                            {...getEditProps('greeting')}
                            className={`font-bold text-slate-900 text-sm sm:text-base block ${editClass()}`}
                          >
                            {currentVariant?.greeting}
                          </p>
                          <p
                            {...getEditProps('intro')}
                            className={`text-slate-600 text-xs sm:text-sm leading-relaxed block ${editClass()}`}
                          >
                            {currentVariant?.intro}
                          </p>
                        </div>

                        {/* 3. KHUNG ẢNH SẢN PHẨM THỰC TẾ + NHÃN GIÁ */}
                        <div className="relative rounded-2xl overflow-hidden shadow-lg border border-slate-200 bg-slate-900 group">
                          <img
                            src={currentVariant?.imageUrl}
                            alt={currentVariant?.productName}
                            onError={(e) => {
                              e.currentTarget.src =
                                'https://placehold.co/1200x600/0f172a/38bdf8?text=' +
                                encodeURIComponent(
                                  currentVariant?.productName || 'Product'
                                );
                            }}
                            className="w-full h-56 sm:h-72 object-cover object-center block"
                          />

                          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-900/25 to-transparent pointer-events-none" />

                          {/* 2 Nhãn góc trên bên trái */}
                          <div className="absolute top-3.5 left-3.5 right-3.5 flex flex-wrap items-center gap-2">
                            <span
                              {...getEditProps('imageBadge')}
                              className={`px-3 py-1 rounded-full bg-blue-600 text-white text-[10px] font-extrabold tracking-wider uppercase shadow inline-block ${editClass(true)}`}
                            >
                              {currentVariant?.imageBadge}
                            </span>
                            <span className="px-3 py-1 rounded-full bg-emerald-500 text-white text-[10px] font-extrabold tracking-wide shadow flex items-center gap-1">
                              <Check className="w-3 h-3 stroke-[3]" />
                              <span>Ảnh & Thông số theo Sản phẩm</span>
                            </span>
                          </div>

                          {/* Góc dưới trái: Thương hiệu + Tên Sản Phẩm | Góc dưới phải: Hộp Giá */}
                          <div className="absolute bottom-3.5 left-4 right-4 flex flex-wrap items-end justify-between gap-3">
                            <div>
                              <div
                                {...getEditProps('brandName')}
                                className={`text-sky-400 text-xs font-extrabold tracking-wide inline-block ${editClass(true)}`}
                              >
                                {currentVariant?.brandName}
                              </div>
                              <div
                                {...getEditProps('productName')}
                                className={`text-white text-lg sm:text-2xl font-black tracking-tight drop-shadow block ${editClass(true)}`}
                              >
                                {currentVariant?.productName}
                              </div>
                            </div>

                            <div className="bg-slate-950/90 backdrop-blur-md border border-slate-700/80 rounded-xl px-3.5 py-2 text-right shadow-xl">
                              <div
                                {...getEditProps('oldPrice')}
                                className={`text-[11px] text-slate-400 line-through font-medium block ${editClass(true)}`}
                              >
                                {currentVariant?.oldPrice}
                              </div>
                              <div
                                {...getEditProps('newPrice')}
                                className={`text-emerald-400 font-extrabold text-sm sm:text-base block ${editClass(true)}`}
                              >
                                {currentVariant?.newPrice}
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* 4. KHỐI 3 THẺ KPI THÔNG SỐ & SỐ LIỆU NỔI BẬT */}
                        <div>
                          <div className="text-[11px] sm:text-xs font-extrabold uppercase tracking-wider text-blue-700 mb-2.5 flex items-center gap-1.5">
                            <span>📊 THÔNG SỐ & SỐ LIỆU NỔI BẬT ({currentVariant?.productName?.toUpperCase()}):</span>
                          </div>
                          <div
                            className={`grid gap-3 ${
                              deviceView === 'mobile'
                                ? 'grid-cols-1'
                                : 'grid-cols-3'
                            }`}
                          >
                            {currentVariant?.kpis?.map((kpi, index) => (
                              <div
                                key={index}
                                className="rounded-xl border border-slate-200 bg-slate-50/70 p-3.5 text-center shadow-sm hover:border-blue-300 transition-all"
                              >
                                <div
                                  {...getEditProps('kpis', index, 'value')}
                                  className={`text-base sm:text-lg font-black text-blue-600 inline-block ${editClass()}`}
                                >
                                  {kpi.value}
                                </div>
                                <div
                                  {...getEditProps('kpis', index, 'title')}
                                  className={`text-xs font-bold text-slate-800 mt-1 block ${editClass()}`}
                                >
                                  {kpi.title}
                                </div>
                                <div
                                  {...getEditProps('kpis', index, 'sub')}
                                  className={`text-[11px] text-slate-500 mt-0.5 block ${editClass()}`}
                                >
                                  {kpi.sub}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* 5. HỘP THÔNG TIN CHƯƠNG TRÌNH & ƯU ĐÃI */}
                        <div className="rounded-2xl bg-blue-50/90 border-l-4 border-l-blue-600 border border-blue-100 p-4 sm:p-5">
                          <div className="text-xs font-extrabold uppercase tracking-wide text-blue-700 mb-1.5 flex items-center gap-1.5">
                            <span>
                              📌{' '}
                              <span
                                {...getEditProps('offerBoxTitle')}
                                className={`inline-block ${editClass()}`}
                              >
                                {currentVariant?.offerBoxTitle}
                              </span>
                            </span>
                          </div>
                          <p
                            {...getEditProps('offerHighlight')}
                            className={`text-xs sm:text-sm text-slate-700 leading-relaxed block ${editClass()}`}
                          >
                            {currentVariant?.offerHighlight}
                          </p>
                        </div>

                        {/* 6. BẢNG SO SÁNH THÔNG SỐ & QUYỀN LỢI */}
                        <div>
                          <div className="text-[11px] sm:text-xs font-extrabold uppercase tracking-wider text-blue-700 mb-2.5 flex items-center gap-1.5">
                            <span>📋 BẢNG SO SÁNH THÔNG SỐ & QUYỀN LỢI:</span>
                          </div>
                          <div className="rounded-xl border border-slate-200 overflow-hidden shadow-sm">
                            <table className="w-full text-left border-collapse text-xs">
                              <thead>
                                <tr className="bg-slate-100 text-slate-700 border-b border-slate-200">
                                  <th className="py-3 px-3.5 font-extrabold w-[32%]">
                                    <span
                                      {...getEditProps('tableHeaders', 0)}
                                      className={`inline-block ${editClass()}`}
                                    >
                                      {currentVariant?.tableHeaders?.[0]}
                                    </span>
                                  </th>
                                  <th className="py-3 px-3.5 font-bold w-[32%]">
                                    <span
                                      {...getEditProps('tableHeaders', 1)}
                                      className={`inline-block ${editClass()}`}
                                    >
                                      {currentVariant?.tableHeaders?.[1]}
                                    </span>
                                  </th>
                                  <th className="py-3 px-3.5 font-extrabold text-slate-900 w-[36%]">
                                    <span
                                      {...getEditProps('tableHeaders', 2)}
                                      className={`inline-block ${editClass()}`}
                                    >
                                      {currentVariant?.tableHeaders?.[2]}
                                    </span>
                                  </th>
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-slate-200/80 bg-white">
                                {currentVariant?.comparisonRows?.map(
                                  (row, rIdx) => (
                                    <tr key={rIdx} className="hover:bg-slate-50/80">
                                      <td className="py-3 px-3.5 font-bold text-slate-800 align-top">
                                        <div
                                          {...getEditProps('comparisonRows', rIdx, 'feature')}
                                          className={`block ${editClass()}`}
                                        >
                                          {row.feature}
                                        </div>
                                      </td>
                                      <td className="py-3 px-3.5 text-slate-500 align-top">
                                        <div
                                          {...getEditProps('comparisonRows', rIdx, 'standard')}
                                          className={`block ${editClass()}`}
                                        >
                                          {row.standard}
                                        </div>
                                      </td>
                                      <td className="py-3 px-3.5 font-extrabold text-blue-600 align-top">
                                        <span className="select-none">✓ </span>
                                        <span
                                          {...getEditProps('comparisonRows', rIdx, 'upgrade')}
                                          className={`inline-block ${editClass()}`}
                                        >
                                          {row.upgrade}
                                        </span>
                                      </td>
                                    </tr>
                                  )
                                )}
                              </tbody>
                            </table>
                          </div>
                        </div>

                        {/* 7. 3 DÒNG CAM KẾT CHẤT LƯỢNG */}
                        <div className="space-y-2 pt-1">
                          {currentVariant?.trustBullets?.map((bullet, bIdx) => (
                            <div
                              key={bIdx}
                              className="flex items-start gap-2.5 text-xs text-slate-600"
                            >
                              <span className="w-4 h-4 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0 mt-0.5 font-bold text-[10px]">
                                ✓
                              </span>
                              <span>
                                <span
                                  {...getEditProps('trustBullets', bIdx)}
                                  className={`inline-block ${editClass()}`}
                                >
                                  {bullet}
                                </span>
                              </span>
                            </div>
                          ))}
                        </div>

                        <p
                          {...getEditProps('closingNote')}
                          className={`text-xs text-slate-600 leading-relaxed block ${editClass()}`}
                        >
                          {currentVariant?.closingNote}
                        </p>

                        {/* 8. NÚT KÊU GỌI HÀNH ĐỘNG (CTA BUTTON) */}
                        <div className="pt-2 pb-3 text-center">
                          <button
                            type="button"
                            onClick={() => {
                              if (!isInlineEditing) {
                                triggerToast(
                                  `Đã kích hoạt CTA: "${currentVariant?.cta}"!`,
                                  `Tỷ lệ nhấp chuột (CTR) dự kiến đạt ~${currentSendTimeInfo.ctr}% ở khung giờ vàng.`
                                );
                              }
                            }}
                            className={`inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl bg-gradient-to-r from-[#2563EB] via-[#6366F1] to-[#A855F7] hover:brightness-110 text-white font-extrabold text-xs sm:text-sm tracking-wide uppercase shadow-[0_10px_25px_rgba(79,70,229,0.4)] transition-all ${
                              isInlineEditing
                                ? ''
                                : 'transform hover:scale-[1.02] active:scale-95'
                            }`}
                          >
                            <span
                              {...getEditProps('cta')}
                              className={`inline-block ${editClass(true)}`}
                            >
                              {currentVariant?.cta}
                            </span>
                            <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                          </button>
                        </div>

                        {/* 9. CHỮ KÝ & CHÂN THƯ */}
                        <div className="pt-4 border-t border-slate-200 text-xs text-slate-500 space-y-1">
                          <p>Trân trọng,</p>
                          <p className="font-bold text-slate-700">
                            Ban Giám đốc Chiến lược & Chăm sóc Khách hàng —{' '}
                            {currentVariant?.brandName}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>

      {/* MODAL LỊCH SỬ LOCALSTORAGE */}
      {showHistoryModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div
            className={`w-full max-w-xl rounded-3xl p-6 max-h-[80vh] flex flex-col ${themeStyles.cardSurface}`}
          >
            <div className="flex items-center justify-between pb-4 border-b border-current/10">
              <div className="flex items-center gap-2.5">
                <History
                  className={`w-5 h-5 ${
                    isDark ? 'text-[#FF476E]' : 'text-[#C59B27]'
                  }`}
                />
                <div>
                  <h3 className="font-bold text-base">
                    Lịch sử Chiến dịch đã tạo
                  </h3>
                  <p className={`text-xs ${themeStyles.mutedText}`}>
                    Nhấn vào chiến dịch bất kỳ để nạp lại sản phẩm, ảnh & bảng so sánh
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowHistoryModal(false)}
                className="p-1.5 rounded-xl hover:bg-current/10"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto py-4 space-y-3">
              {historyList.length === 0 ? (
                <div className="text-center py-12 opacity-60 text-sm">
                  Chưa có chiến dịch nào trong lịch sử.
                </div>
              ) : (
                historyList.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => {
                      setBrandName(item.brandName);
                      setProductName(item.productName || 'TV OLED 50 inch 4K AI');
                      setIndustry(item.industry);
                      setGoal(item.goal);
                      setOffer(item.offer);
                      setTone(item.tone);
                      if (item.variants) setVariants(item.variants);
                      setShowHistoryModal(false);
                      triggerToast(
                        `Đã nạp lại chiến dịch "${item.productName || item.brandName}"!`
                      );
                    }}
                    className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                      isDark
                        ? 'bg-[#0B0616] border-[#2D1B4E] hover:border-[#FF2A54]'
                        : 'bg-[#FCF9F2] border-[#E6D29E] hover:border-[#5E43F3]'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-extrabold text-sm">
                        {item.productName} — {item.brandName}
                      </span>
                      <span className={`text-[11px] ${themeStyles.mutedText}`}>
                        {item.timestamp}
                      </span>
                    </div>
                    <p className="text-xs line-clamp-2 opacity-85">
                      {item.offer}
                    </p>
                  </div>
                ))
              )}
            </div>

            {historyList.length > 0 && (
              <div className="pt-3 border-t border-current/10 flex justify-end">
                <button
                  onClick={() => {
                    setHistoryList([]);
                    try {
                      localStorage.removeItem('vibe_campaigns_history_v2');
                    } catch {
                      // ignore
                    }
                    triggerToast('Đã xóa lịch sử chiến dịch!');
                  }}
                  className="px-3.5 py-2 rounded-xl text-xs font-bold text-rose-400 hover:bg-rose-500/10 flex items-center gap-1.5"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Xóa tất cả</span>
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* TOAST THÔNG BÁO */}
      {toast && (
        <div className="fixed bottom-5 right-5 z-50 max-w-md">
          <div
            className={`px-4 py-3.5 rounded-2xl border shadow-2xl flex items-start gap-3 ${
              isDark
                ? 'bg-[#180C2E] border-[#FF2A54] text-white'
                : 'bg-white border-[#C59B27] text-[#1C1917]'
            }`}
          >
            <Check
              className={`w-5 h-5 shrink-0 mt-0.5 ${
                isDark ? 'text-[#FF476E]' : 'text-[#5E43F3]'
              }`}
            />
            <div>
              <div className="font-extrabold text-xs sm:text-sm">
                {toast.message}
              </div>
              {toast.subtext && (
                <div className={`text-xs mt-0.5 ${themeStyles.mutedText}`}>
                  {toast.subtext}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
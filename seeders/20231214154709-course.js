'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Courses', [
      {
        title: 'Html & Css Full Course',
        about:
          'Tersedia kursus lengkap berjudul HTML dan CSS Full Course yang akan membimbing Anda melalui dasar-dasar dan teknik lanjutan pengembangan web menggunakan HTML dan CSS.',
        objective:
          'Objektif dari kursus HTML dan CSS Full Course ini adalah memberikan pemahaman mendalam tentang dasar-dasar HTML dan CSS, melibatkan peserta dalam proyek praktis untuk meningkatkan keterampilan pengembangan web',
        onboarding:
          'Mulai dari pendaftaran hingga pemahaman mendalam tentang struktur kursus, materi pembelajaran, dan sumber daya tambahan yang akan memastikan pengalaman pembelajaran Anda yang optimal.',
        categoryId: 'C-0WEB',
        level: 'Beginner',
        courseType: 'Premium',
        imageUrl:
          'https://ik.imagekit.io/yxctvbjvh/webdev.png?updatedAt=1702571003474',
        rating: 4.5,
        instructor: 'Eko Kurnawan',
        duration: 460,
        telegramLink: 'https://t.me/+hJi8g3yP7cw5MzE1',
        moduleCount: 4,
        price: 50000,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Android Development Masterclass',
        about:
          'Jelajahi dunia pengembangan Android dengan kursus lengkap ini, membimbing Anda melalui konsep dasar dan teknik tingkat lanjut untuk membangun aplikasi Android yang inovatif dan fungsional.',
        objective:
          'Tujuan dari kursus Android Development Masterclass ini adalah memberikan pemahaman komprehensif tentang pengembangan aplikasi Android, melibatkan peserta dalam proyek praktis untuk meningkatkan keterampilan pengembangan',
        onboarding:
          'Mulai dari pendaftaran hingga pemahaman mendalam tentang struktur kursus, materi pembelajaran, dan sumber daya tambahan. Kami berkomitmen untuk memberikan dukungan penuh selama perjalanan pembelajaran Anda dalam menguasai Android Development.',
        categoryId: 'C-0AND',
        level: 'Intermediate',
        courseType: 'Premium',
        imageUrl:
          'https://ik.imagekit.io/yxctvbjvh/anddev.png?updatedAt=1702571096609',
        rating: 4.7,
        instructor: 'Rina Android',
        duration: 327,
        telegramLink: 'https://t.me/+qjfHnDI-k7ZkYWM1',
        moduleCount: 3,
        price: 75000,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Business Intelligence Masterclass',
        about:
          'Jelajahi dunia Business Intelligence dengan kursus komprehensif ini, membimbing Anda melalui konsep dasar dan teknik tingkat lanjut untuk memanfaatkan data guna membuat keputusan bisnis yang informasional.',
        objective:
          'Tujuan dari Business Intelligence Masterclass adalah memberikan pemahaman mendalam tentang alat BI, visualisasi data, dan analitika. Terlibat dalam proyek praktis untuk meningkatkan keterampilan analisis Anda',
        onboarding:
          'Dari pendaftaran hingga pemahaman mendalam tentang struktur kursus, materi pembelajaran, dan sumber daya tambahan. Kami berkomitmen untuk memberikan dukungan penuh selama perjalanan pembelajaran Anda dalam menguasai Business Intelligence.',
        categoryId: 'C-0BI',
        level: 'Intermediate',
        courseType: 'Free',
        imageUrl:
          'https://ik.imagekit.io/yxctvbjvh/bi.png?updatedAt=1702570942212',
        rating: 4.6,
        instructor: 'Alex BI',
        duration: 297,
        telegramLink: 'https://t.me/+Vn9Nvd_T8WRhZjRl',
        moduleCount: 3,
        price: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Bootcamp Pengembangan Aplikasi iOS',
        about:
          'Mulailah perjalanan Anda dalam pengembangan aplikasi iOS dengan bootcamp praktis ini. Pelajari dasar-dasar pemrograman Swift, desain UI/UX, dan implementasi di App Store untuk membuat aplikasi iOS terkini.',
        objective:
          'Memberi Anda keterampilan untuk membangun dan meluncurkan aplikasi iOS Anda sendiri. Terlibat dalam latihan kodifikasi dan proyek praktis untuk memperkuat pemahaman Anda tentang pengembangan aplikasi mobile.',
        onboarding:
          'Dari pendaftaran hingga pemahaman mendalam tentang struktur kursus, materi pembelajaran, dan sumber daya tambahan. Kami berkomitmen untuk memberikan dukungan penuh selama perjalanan pembelajaran Anda dalam menguasai pengembangan iOS.',
        categoryId: 'C-0IOS',
        level: 'Beginner',
        courseType: 'Premium',
        imageUrl:
          'https://ik.imagekit.io/yxctvbjvh/anddev.png?updatedAt=1702571096609',
        rating: 4.9,
        instructor: 'Chris iOS',
        duration: 337,
        telegramLink: 'https://t.me/+Y1xymUF7WxRmZjY1',
        moduleCount: 3,
        price: 95000,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'DevOps Essentials: Kursus Lengkap',
        about:
          'Temukan dunia DevOps dengan kursus lengkap ini, membimbing Anda melalui konsep, praktik, dan alat yang diperlukan untuk mengintegrasikan pengembangan dan operasi guna mencapai otomatisasi dan perealisasian perangkat lunak yang efisien.',
        objective:
          'Tujuan dari kursus DevOps Essentials ini adalah memberikan pemahaman menyeluruh tentang metodologi DevOps, alat CI/CD, dan praktik terbaik untuk meningkatkan kolaborasi antara tim pengembangan dan operasi.',
        onboarding:
          'Mulai dari pendaftaran hingga pemahaman mendalam tentang struktur kursus, materi pembelajaran, dan sumber daya tambahan. Kami berkomitmen untuk memberikan dukungan penuh selama perjalanan pembelajaran Anda dalam menguasai DevOps.',
        categoryId: 'C-0OT',
        level: 'Beginner',
        courseType: 'Premium',
        imageUrl:
          'https://ik.imagekit.io/yxctvbjvh/webdev.png?updatedAt=1702571003474',
        rating: 4.7,
        instructor: 'Denny DevOps',
        duration: 308,
        telegramLink: 'https://t.me/+LdPp_K5zrFIzOTQ1',
        moduleCount: 3,
        price: 30000,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Java Programming: Kursus Dasar dan Lanjutan',
        about:
          'Telusuri kekuatan bahasa pemrograman Java dengan kursus ini, membimbing Anda melalui dasar-dasar sintaksis, konsep pemrograman berorientasi objek, hingga teknik pengembangan aplikasi yang canggih.',
        objective:
          'Tujuan dari kursus Java Programming ini adalah memberikan pemahaman mendalam tentang bahasa Java, melibatkan peserta dalam proyek pengembangan perangkat lunak praktis untuk meningkatkan keterampilan pemrograman.',
        onboarding:
          'Dari pendaftaran hingga pemahaman mendalam tentang struktur kursus, materi pembelajaran, dan sumber daya tambahan. Kami berkomitmen untuk memberikan dukungan penuh selama perjalanan pembelajaran Anda dalam menguasai Java Programming.',
        categoryId: 'C-0AND',
        level: 'Advance',
        courseType: 'Premium',
        imageUrl:
          'https://ik.imagekit.io/yxctvbjvh/anddev.png?updatedAt=1702571096609',
        rating: 4.8,
        instructor: 'Budi Java',
        duration: 347,
        telegramLink: 'https://t.me/+qjfHnDI-k7ZkYWM1',
        moduleCount: 3,
        price: 100000,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'React JS Mastery: Kursus Pengembangan Web Interaktif',
        about:
          'Pelajari dan kuasai React JS, perpustakaan JavaScript yang populer untuk membangun antarmuka pengguna yang dinamis dan responsif. Kursus ini membimbing Anda melalui konsep dasar, state management, dan pengembangan aplikasi web interaktif dengan React.',
        objective:
          'Tujuan dari kursus React JS Mastery ini adalah memberikan pemahaman mendalam tentang React JS, termasuk pengelolaan state dan komponen',
        onboarding:
          'Mulai dari pendaftaran hingga pemahaman mendalam tentang struktur kursus, materi pembelajaran, dan sumber daya tambahan. Kami berkomitmen untuk memberikan dukungan penuh selama perjalanan pembelajaran Anda dalam menguasai React JS.',
        categoryId: 'C-0WEB',
        level: 'Intermediate',
        courseType: 'Premium',
        imageUrl:
          'https://ik.imagekit.io/yxctvbjvh/webdev.png?updatedAt=1702571003474',
        rating: 4.9,
        instructor: 'Rita React',
        duration: 285,
        telegramLink: 'https://t.me/+hJi8g3yP7cw5MzE1',
        moduleCount: 4,
        price: 90000,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Node.js & Express.js: Kursus Pengembangan Backend',
        about:
          'Temukan kekuatan pengembangan backend dengan Node.js dan Express.js, membimbing Anda melalui pembuatan server, manajemen rute, integrasi database, dan pengembangan API yang efisien.',
        objective:
          'Tujuan dari kursus Node.js & Express.js ini adalah memberikan pemahaman mendalam tentang pengembangan backend dengan Node.js dan Express.js. Terlibat dalam proyek-proyek praktis untuk meningkatkan keterampilan pengembangan server dan API RESTful.',
        onboarding:
          'Mulai dari pendaftaran hingga pemahaman mendalam tentang struktur kursus, materi pembelajaran, dan sumber daya tambahan. Kami berkomitmen untuk memberikan dukungan penuh selama perjalanan pembelajaran Anda',
        categoryId: 'C-0WEB',
        level: 'Advance',
        courseType: 'Premium',
        imageUrl:
          'https://ik.imagekit.io/yxctvbjvh/expressjspic.png?updatedAt=1703695154959',
        rating: 4.8,
        instructor: 'Nina Node',
        duration: 768,
        telegramLink: 'https://t.me/+hJi8g3yP7cw5MzE1',
        moduleCount: 6,
        price: 200000,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // {
      //   title: 'Kotlin for Android Development: Kursus Lengkap',
      //   about:
      //     'Jelajahi kekuatan bahasa pemrograman Kotlin untuk pengembangan Android dengan kursus ini, membimbing Anda melalui sintaksis Kotlin, penggunaan Android Studio, dan pembuatan aplikasi Android yang modern dan efisien.',
      //   objective:
      //     'Tujuan dari kursus Kotlin for Android Development ini adalah memberikan pemahaman mendalam tentang pengembangan aplikasi Android menggunakan Kotlin. Melalui proyek-proyek praktis, tingkatkan keterampilan pemrograman Anda dan siapkan diri untuk membuat aplikasi Android yang responsif dan inovatif.',
      //   onboarding:
      //     'Mulai dari pendaftaran hingga pemahaman mendalam tentang struktur kursus, materi pembelajaran, dan sumber daya tambahan. Kami berkomitmen untuk memberikan dukungan penuh selama perjalanan pembelajaran Anda dalam menguasai Kotlin untuk pengembangan Android.',
      //   categoryId: 'C-0AND',
      //   level: 'Advance',
      //   courseType: 'Premium',
      //   imageUrl:
      //     'https://ik.imagekit.io/yxctvbjvh/anddev.png?updatedAt=1702571096609',
      //   rating: 4.9,
      //   instructor: 'Kevin Kotlin',
      //   duration: 0,
      //   telegramLink: 'https://t.me/+qjfHnDI-k7ZkYWM1',
      //   moduleCount: 5,
      //   price: 90000,
      //   createdAt: new Date(),
      //   updatedAt: new Date(),
      // },
      {
        title: 'UI/UX Design with Figma: Kursus Lengkap',
        about:
          'Pelajari seni desain antarmuka pengguna (UI) dan pengalaman pengguna (UX) dengan Figma dalam kursus ini. Membimbing Anda melalui konsep desain, kolaborasi tim, dan pembuatan prototipe interaktif untuk proyek desain yang menarik.',
        objective:
          'Tujuan dari kursus UI/UX Design with Figma ini adalah memberikan pemahaman mendalam tentang Figma, termasuk desain antarmuka dan pengalaman pengguna. Terlibat dalam proyek-proyek praktis untuk mengasah keterampilan desain Anda',
        onboarding:
          'Mulai dari pendaftaran hingga pemahaman mendalam tentang struktur kursus, materi pembelajaran, dan sumber daya tambahan. Kami berkomitmen untuk memberikan dukungan penuh pembelajaran Anda dalam menguasai UI/UX Design dengan Figma.',
        categoryId: 'C-0UIX',
        level: 'Advance',
        courseType: 'Free',
        imageUrl:
          'https://ik.imagekit.io/yxctvbjvh/uiuxcourse.jpg?updatedAt=1703695343967',
        rating: 4.7,
        instructor: 'Fiona Figma',
        duration: 464,
        telegramLink: 'https://t.me/+5NjvdSfY4PlkYzRl',
        moduleCount: 4,
        price: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // {
      //   title: 'Adobe UI/UX Design Mastery: Kursus Lengkap',
      //   about:
      //     'Kuasai seni desain antarmuka pengguna (UI) dan pengalaman pengguna (UX) dengan perangkat lunak Adobe dalam kursus ini. Membimbing Anda melalui konsep desain, alat-alat kreatif, dan teknik pembuatan prototipe untuk menciptakan proyek desain yang inovatif.',
      //   objective:
      //     'Tujuan dari kursus Adobe UI/UX Design Mastery ini adalah memberikan pemahaman mendalam tentang perangkat lunak Adobe untuk desain UI/UX, termasuk Photoshop dan XD. Terlibat dalam proyek-proyek praktis untuk meningkatkan keterampilan desain Anda dan menciptakan pengalaman pengguna yang menarik.',
      //   onboarding:
      //     'Mulai dari pendaftaran hingga pemahaman mendalam tentang struktur kursus, materi pembelajaran, dan sumber daya tambahan. Kami berkomitmen untuk memberikan dukungan penuh selama perjalanan pembelajaran Anda dalam menguasai UI/UX Design dengan Adobe.',
      //   categoryId: 'C-0UIX',
      //   level: 'Beginner',
      //   courseType: 'Free',
      //   imageUrl:
      //     'https://ik.imagekit.io/yxctvbjvh/uiux.png?updatedAt=1702571031952',
      //   rating: 4.8,
      //   instructor: 'Adam Adobe',
      //   duration: 0,
      //   telegramLink: 'https://t.me/+5NjvdSfY4PlkYzRl',
      //   moduleCount: 5,
      //   price: 0,
      //   createdAt: new Date(),
      //   updatedAt: new Date(),
      // },
      // {
      //   title: 'Cloud Computing Fundamentals: Kursus Lengkap',
      //   about:
      //     'Jelajahi dunia komputasi awan dengan kursus komprehensif ini, membimbing Anda melalui konsep dasar, layanan awan populer, dan praktik terbaik dalam pemanfaatan sumber daya komputasi secara fleksibel dan efisien.',
      //   objective:
      //     'Tujuan dari kursus Cloud Computing Fundamentals ini adalah memberikan pemahaman mendalam tentang dasar-dasar komputasi awan, termasuk infrastruktur sebagai layanan (IaaS), platform sebagai layanan (PaaS), dan perangkat lunak sebagai layanan (SaaS). Melalui proyek-proyek praktis, tingkatkan keterampilan Anda dalam mengelola dan mengimplementasikan solusi awan.',
      //   onboarding:
      //     'Mulai dari pendaftaran hingga pemahaman mendalam tentang struktur kursus, materi pembelajaran, dan sumber daya tambahan. Kami berkomitmen untuk memberikan dukungan penuh selama perjalanan pembelajaran Anda dalam menguasai Cloud Computing.',
      //   categoryId: 'C-0OT',
      //   level: 'Beginner',
      //   courseType: 'Premium',
      //   imageUrl:
      //     'https://ik.imagekit.io/yxctvbjvh/datascience.png?updatedAt=1702570987213',
      //   rating: 4.9,
      //   instructor: 'Chris Cloud',
      //   duration: 0,
      //   telegramLink: 'https://t.me/+LdPp_K5zrFIzOTQ1',
      //   moduleCount: 6,
      //   price: 95000,
      //   createdAt: new Date(),
      //   updatedAt: new Date(),
      // },
      // {
      //   title: 'Next.js for Beginners: Kursus Pemula',
      //   about:
      //     'Pelajari dasar-dasar pengembangan web dengan Next.js dalam kursus ini. Membimbing Anda melalui instalasi, struktur proyek, dan pembuatan aplikasi web yang responsif dan efisien dengan menggunakan framework React yang powerful.',
      //   objective:
      //     'Tujuan dari kursus Next.js for Beginners ini adalah memberikan pemahaman mendalam tentang pengembangan web dengan Next.js. Terlibat dalam proyek-proyek praktis untuk memperkuat keterampilan pengembangan front-end Anda dan mempersiapkan diri Anda untuk membuat aplikasi web modern dengan mudah.',
      //   onboarding:
      //     'Mulai dari pendaftaran hingga pemahaman mendalam tentang struktur kursus, materi pembelajaran, dan sumber daya tambahan. Kami berkomitmen untuk memberikan dukungan penuh selama perjalanan pembelajaran Anda dalam menguasai Next.js.',
      //   categoryId: 'C-0WEB',
      //   level: 'Beginner',
      //   courseType: 'Free',
      //   imageUrl:
      //     'https://ik.imagekit.io/yxctvbjvh/webdev.png?updatedAt=1702571003474',
      //   rating: 4.7,
      //   instructor: 'Nina Next',
      //   duration: 0,
      //   telegramLink: 'https://t.me/+hJi8g3yP7cw5MzE1',
      //   moduleCount: 4,
      //   price: 0,
      //   createdAt: new Date(),
      //   updatedAt: new Date(),
      // },
    ])

    const idHtmlCss = await queryInterface.rawSelect(
      'Courses',
      {
        where: { title: 'Html & Css Full Course' },
      },
      ['id'],
    )

    const idAndroidMS = await queryInterface.rawSelect(
      'Courses',
      {
        where: { title: 'Android Development Masterclass' },
      },
      ['id'],
    )

    const idBIMS = await queryInterface.rawSelect(
      'Courses',
      {
        where: { title: 'Business Intelligence Masterclass' },
      },
      ['id'],
    )

    const idBIOS = await queryInterface.rawSelect(
      'Courses',
      {
        where: { title: 'Bootcamp Pengembangan Aplikasi iOS' },
      },
      ['id'],
    )

    const idDEVOPS = await queryInterface.rawSelect(
      'Courses',
      {
        where: { title: 'DevOps Essentials: Kursus Lengkap' },
      },
      ['id'],
    )

    const idJAVA = await queryInterface.rawSelect(
      'Courses',
      {
        where: { title: 'Java Programming: Kursus Dasar dan Lanjutan' },
      },
      ['id'],
    )

    const idREACTJS = await queryInterface.rawSelect(
      'Courses',
      {
        where: {
          title: 'React JS Mastery: Kursus Pengembangan Web Interaktif',
        },
      },
      ['id'],
    )
    const idNODE = await queryInterface.rawSelect(
      'Courses',
      {
        where: {
          title: 'Node.js & Express.js: Kursus Pengembangan Backend',
        },
      },
      ['id'],
    )
    // const idKOTLIN = await queryInterface.rawSelect(
    //   'Courses',
    //   {
    //     where: {
    //       title: 'Kotlin for Android Development: Kursus Lengkap',
    //     },
    //   },
    //   ['id'],
    // )
    const idFIGMA = await queryInterface.rawSelect(
      'Courses',
      {
        where: {
          title: 'UI/UX Design with Figma: Kursus Lengkap',
        },
      },
      ['id'],
    )
    // const idADOBE = await queryInterface.rawSelect(
    //   'Courses',
    //   {
    //     where: {
    //       title: 'Adobe UI/UX Design Mastery: Kursus Lengkap',
    //     },
    //   },
    //   ['id'],
    // )
    // const idCLOUD = await queryInterface.rawSelect(
    //   'Courses',
    //   {
    //     where: {
    //       title: 'Cloud Computing Fundamentals: Kursus Lengkap',
    //     },
    //   },
    //   ['id'],
    // )
    // const idNEXTJS = await queryInterface.rawSelect(
    //   'Courses',
    //   {
    //     where: {
    //       title: 'Next.js for Beginners: Kursus Pemula',
    //     },
    //   },
    //   ['id'],
    // )

    await queryInterface.bulkInsert('Modules', [
      //------------//
      // create module html css
      {
        title: 'Chapter 1: HTML Dasar',
        duration: 210,
        courseId: idHtmlCss,
        isLocked: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Chapter 2: Dasar-Dasar Penyusunan CSS',
        duration: 80,
        courseId: idHtmlCss,
        isLocked: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Chapter 3: Desain Web Responsif dengan Media Queries',
        duration: 50,
        courseId: idHtmlCss,
        isLocked: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Chapter 4: Fleksibel Box dan Tata Letak Grid',
        duration: 120,
        courseId: idHtmlCss,
        isLocked: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      //------------//
      // create module android masterclass
      {
        title: 'Chapter 1: Pengenalan Pengembangan Android',
        duration: 80,
        courseId: idAndroidMS,
        isLocked: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Chapter 2: Membangun Aplikasi Android Pertama Anda',
        duration: 160,
        courseId: idAndroidMS,
        isLocked: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Chapter 3: Desain Antarmuka Pengguna di Android',
        duration: 87,
        courseId: idAndroidMS,
        isLocked: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      //------------//
      // create module bussiness intelligence masterclass
      {
        title: 'Chapter 1: Pengenalan Bisnis Intelligence',
        duration: 95,
        courseId: idBIMS,
        isLocked: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Chapter 2: Data Warehousing dan Proses ETL',
        duration: 123,
        courseId: idBIMS,
        isLocked: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Chapter 3: Teknik Visualisasi Data Lanjutan',
        duration: 79,
        courseId: idBIMS,
        isLocked: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      //------------//
      // create module bootcamp ios development
      {
        title: 'Chapter 1: Pengenalan Pengembangan Aplikasi iOS',
        duration: 110,
        courseId: idBIOS,
        isLocked: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Chapter 2: Dasar-dasar Bahasa Pemrograman Swift',
        duration: 145,
        courseId: idBIOS,
        isLocked: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Chapter 3: Membangun Antarmuka Pengguna dengan UIKit',
        duration: 82,
        courseId: idBIOS,
        isLocked: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      //------------//
      // create module devops esentiall
      {
        title: 'Chapter 1: Pengenalan DevOps',
        duration: 45,
        courseId: idDEVOPS,
        isLocked: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Chapter 2: Prinsip-Prinsip Kunci DevOps',
        duration: 158,
        courseId: idDEVOPS,
        isLocked: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Chapter 3: Alat dan Teknologi DevOps',
        duration: 105,
        courseId: idDEVOPS,
        isLocked: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      //------------//
      // create module Java Programming: Kursus Dasar dan Lanjutan
      {
        title: 'Chapter 1: Pengenalan Pemrograman Java',
        duration: 85,
        courseId: idJAVA,
        isLocked: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Chapter 2: Syntax dan Konsep Dasar Java',
        duration: 128,
        courseId: idJAVA,
        isLocked: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Chapter 3: Teknik Pemrograman Java Lanjutan',
        duration: 134,
        courseId: idJAVA,
        isLocked: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      //------------//
      // create module React JS Mastery: Kursus Pengembangan Web Interaktif
      {
        title: 'Chapter 1: Pengenalan React JS',
        duration: 78,
        courseId: idREACTJS,
        isLocked: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Chapter 2: Komponen dan Properti React',
        duration: 33,
        courseId: idREACTJS,
        isLocked: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Chapter 3: Manajemen State di React',
        duration: 63,
        courseId: idREACTJS,
        isLocked: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Chapter 4: Routing dan Navigasi di React',
        duration: 111,
        courseId: idREACTJS,
        isLocked: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      //------------//
      // create module Node.js & Express.js: Kursus Pengembangan Backend
      {
        title: 'Chapter 1: Dasar-dasar Node.js',
        duration: 225,
        courseId: idNODE,
        isLocked: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Chapter 2: Memahami Express.js',
        duration: 152,
        courseId: idNODE,
        isLocked: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Chapter 3: Routing dan Middleware',
        duration: 125,
        courseId: idNODE,
        isLocked: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Chapter 4: Membangun RESTful API dengan Express',
        duration: 125,
        courseId: idNODE,
        isLocked: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Chapter 5: Koneksi ke Database',
        duration: 73,
        courseId: idNODE,
        isLocked: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Chapter 6: Keamanan pada Aplikasi Node.js',
        duration: 67,
        courseId: idNODE,
        isLocked: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      //------------//
      // create module UI/UX with Figma

      {
        title: 'Chapter 1: Pengenalan UI/UX Design',
        duration: 81,
        courseId: idFIGMA,
        isLocked: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Chapter 2: Menyusun Ide Desain dengan Figma',
        duration: 107,
        courseId: idFIGMA,
        isLocked: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Chapter 3: Mendesain Antarmuka Pengguna (UI)',
        duration: 133,
        courseId: idFIGMA,
        isLocked: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Chapter 4: Mengoptimalkan Pengalaman Pengguna (UX)',
        duration: 143,
        courseId: idFIGMA,
        isLocked: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ])

    //------------//
    // id module html css
    const idModuleHtmlCss1 = await queryInterface.rawSelect(
      'Modules',
      {
        where: { title: 'Chapter 1: HTML Dasar' },
      },
      ['id'],
    )
    const idModuleHtmlCss2 = await queryInterface.rawSelect(
      'Modules',
      {
        where: { title: 'Chapter 2: Dasar-Dasar Penyusunan CSS' },
      },
      ['id'],
    )
    const idModuleHtmlCss3 = await queryInterface.rawSelect(
      'Modules',
      {
        where: {
          title: 'Chapter 3: Desain Web Responsif dengan Media Queries',
        },
      },
      ['id'],
    )
    const idModuleHtmlCss4 = await queryInterface.rawSelect(
      'Modules',
      {
        where: { title: 'Chapter 4: Fleksibel Box dan Tata Letak Grid' },
      },
      ['id'],
    )
    //------------//
    // id module android masterclass
    const idModuleAndroidMS1 = await queryInterface.rawSelect(
      'Modules',
      {
        where: { title: 'Chapter 1: Pengenalan Pengembangan Android' },
      },
      ['id'],
    )
    const idModuleAndroidMS2 = await queryInterface.rawSelect(
      'Modules',
      {
        where: { title: 'Chapter 2: Membangun Aplikasi Android Pertama Anda' },
      },
      ['id'],
    )
    const idModuleAndroidMS3 = await queryInterface.rawSelect(
      'Modules',
      {
        where: {
          title: 'Chapter 3: Desain Antarmuka Pengguna di Android',
        },
      },
      ['id'],
    )

    //------------//
    // id module bussiness intelligence masterclass
    const idModuleBIMS1 = await queryInterface.rawSelect(
      'Modules',
      {
        where: { title: 'Chapter 1: Pengenalan Bisnis Intelligence' },
      },
      ['id'],
    )
    const idModuleBIMS2 = await queryInterface.rawSelect(
      'Modules',
      {
        where: { title: 'Chapter 2: Data Warehousing dan Proses ETL' },
      },
      ['id'],
    )
    const idModuleBIMS3 = await queryInterface.rawSelect(
      'Modules',
      {
        where: {
          title: 'Chapter 3: Teknik Visualisasi Data Lanjutan',
        },
      },
      ['id'],
    )

    //------------//
    // id module bootcamp pengembangan ios development
    const idModuleBIOS1 = await queryInterface.rawSelect(
      'Modules',
      {
        where: { title: 'Chapter 1: Pengenalan Pengembangan Aplikasi iOS' },
      },
      ['id'],
    )
    const idModuleBIOS2 = await queryInterface.rawSelect(
      'Modules',
      {
        where: { title: 'Chapter 2: Dasar-dasar Bahasa Pemrograman Swift' },
      },
      ['id'],
    )
    const idModuleBIOS3 = await queryInterface.rawSelect(
      'Modules',
      {
        where: {
          title: 'Chapter 3: Membangun Antarmuka Pengguna dengan UIKit',
        },
      },
      ['id'],
    )

    //------------//
    // id module devops essential: kursus lengkap
    const idModuleDEVOPS1 = await queryInterface.rawSelect(
      'Modules',
      {
        where: { title: 'Chapter 1: Pengenalan DevOps' },
      },
      ['id'],
    )
    const idModuleDEVOPS2 = await queryInterface.rawSelect(
      'Modules',
      {
        where: { title: 'Chapter 2: Prinsip-Prinsip Kunci DevOps' },
      },
      ['id'],
    )
    const idModuleDEVOPS3 = await queryInterface.rawSelect(
      'Modules',
      {
        where: {
          title: 'Chapter 3: Alat dan Teknologi DevOps',
        },
      },
      ['id'],
    )

    //------------//
    // id module Java Programming: Kursus Dasar dan Lanjutan
    const idModuleJAVA1 = await queryInterface.rawSelect(
      'Modules',
      {
        where: { title: 'Chapter 1: Pengenalan Pemrograman Java' },
      },
      ['id'],
    )
    const idModuleJAVA2 = await queryInterface.rawSelect(
      'Modules',
      {
        where: { title: 'Chapter 2: Syntax dan Konsep Dasar Java' },
      },
      ['id'],
    )
    const idModuleJAVA3 = await queryInterface.rawSelect(
      'Modules',
      {
        where: {
          title: 'Chapter 3: Teknik Pemrograman Java Lanjutan',
        },
      },
      ['id'],
    )

    //------------//
    // id module JReact JS Mastery: Kursus Pengembangan Web Interaktif
    const idModuleREACTJS1 = await queryInterface.rawSelect(
      'Modules',
      {
        where: { title: 'Chapter 1: Pengenalan React JS' },
      },
      ['id'],
    )
    const idModuleREACTJS2 = await queryInterface.rawSelect(
      'Modules',
      {
        where: { title: 'Chapter 2: Komponen dan Properti React' },
      },
      ['id'],
    )
    const idModuleREACTJS3 = await queryInterface.rawSelect(
      'Modules',
      {
        where: {
          title: 'Chapter 3: Manajemen State di React',
        },
      },
      ['id'],
    )

    const idModuleREACTJS4 = await queryInterface.rawSelect(
      'Modules',
      {
        where: {
          title: 'Chapter 4: Routing dan Navigasi di React',
        },
      },
      ['id'],
    )

    //------------//
    // id module Node.js & Express.js: Kursus Pengembangan Backend
    const idModuleNODE1 = await queryInterface.rawSelect(
      'Modules',
      {
        where: { title: 'Chapter 1: Dasar-dasar Node.js' },
      },
      ['id'],
    )
    const idModuleNODE2 = await queryInterface.rawSelect(
      'Modules',
      {
        where: { title: 'Chapter 2: Memahami Express.js' },
      },
      ['id'],
    )
    const idModuleNODE3 = await queryInterface.rawSelect(
      'Modules',
      {
        where: {
          title: 'Chapter 3: Routing dan Middleware',
        },
      },
      ['id'],
    )

    const idModuleNODE4 = await queryInterface.rawSelect(
      'Modules',
      {
        where: {
          title: 'Chapter 4: Membangun RESTful API dengan Express',
        },
      },
      ['id'],
    )
    const idModuleNODE5 = await queryInterface.rawSelect(
      'Modules',
      {
        where: {
          title: 'Chapter 5: Koneksi ke Database',
        },
      },
      ['id'],
    )
    const idModuleNODE6 = await queryInterface.rawSelect(
      'Modules',
      {
        where: {
          title: 'Chapter 6: Keamanan pada Aplikasi Node.js',
        },
      },
      ['id'],
    )

    //------------//
    // id module UI/UX with Figma
    const idModuleFIGMA1 = await queryInterface.rawSelect(
      'Modules',
      {
        where: { title: 'Chapter 1: Pengenalan UI/UX Design' },
      },
      ['id'],
    )
    const idModuleFIGMA2 = await queryInterface.rawSelect(
      'Modules',
      {
        where: { title: 'Chapter 2: Menyusun Ide Desain dengan Figma' },
      },
      ['id'],
    )
    const idModuleFIGMA3 = await queryInterface.rawSelect(
      'Modules',
      {
        where: {
          title: 'Chapter 3: Mendesain Antarmuka Pengguna (UI)',
        },
      },
      ['id'],
    )

    const idModuleFIGMA4 = await queryInterface.rawSelect(
      'Modules',
      {
        where: {
          title: 'Chapter 4: Mengoptimalkan Pengalaman Pengguna (UX)',
        },
      },
      ['id'],
    )

    await queryInterface.bulkInsert('Videos', [
      //------------//
      // create video for module html css
      {
        title: 'Introduction kepada HTML Basics',
        no: 1,
        videoUrl: 'eSrXU5vrgaI',
        duration: 50,
        moduleId: idModuleHtmlCss1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'HTML Document Structure',
        no: 2,
        videoUrl: 'JVJc4k6xjTM',
        duration: 30,
        moduleId: idModuleHtmlCss1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'HTML Semantic',
        no: 3,
        videoUrl: 'BruzjxVsneM',
        duration: 60,
        moduleId: idModuleHtmlCss1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'HTML Form dan Advance HTML',
        no: 4,
        videoUrl: 'iQwND8dlCdM',
        duration: 70,
        moduleId: idModuleHtmlCss1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Introduction kepada Css Basics',
        no: 1,
        videoUrl: 'CjzwkDddlFM',
        duration: 50,
        moduleId: idModuleHtmlCss2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'CSS Styling sampai mahir',
        no: 2,
        videoUrl: 'SKoGGSF4fDc',
        duration: 30,
        moduleId: idModuleHtmlCss2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Css Media Queries Dasar sampai Mahir',
        no: 1,
        videoUrl: 'HOPtedXdrCY',
        duration: 50,
        moduleId: idModuleHtmlCss3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Belajar css grid dan flexbox dengan membuat youtube clone',
        no: 1,
        videoUrl: 'vlaBGlCOSg0',
        duration: 120,
        moduleId: idModuleHtmlCss4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      //------------//
      // create video for module android masterclass
      {
        title: 'Introduction to Android Studio',
        no: 1,
        videoUrl: 'HOPtedXdrCY',
        duration: 50,
        moduleId: idModuleAndroidMS1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Setting Up Android Project Pertama Kamu',
        no: 2,
        videoUrl: 'vlaBGlCOSg0',
        duration: 30,
        moduleId: idModuleAndroidMS1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Memulai dengan Android Studio',
        no: 1,
        videoUrl: 'j7hZe2ZwWPo',
        duration: 70,
        moduleId: idModuleAndroidMS2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Membuat Proyek Android Pertama Anda',
        no: 2,
        videoUrl: 'CjzwkDddlFM',
        duration: 90,
        moduleId: idModuleAndroidMS2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Desain Antarmuka Pengguna di Android',
        no: 1,
        videoUrl: 'CjzwkDddlFM',
        duration: 35,
        moduleId: idModuleAndroidMS3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Mengoptimalkan Pengalaman Pengguna',
        no: 2,
        videoUrl: 'vlaBGlCOSg0',
        duration: 52,
        moduleId: idModuleAndroidMS3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      //------------//
      // create video for module bussiness intelligence masterclass
      {
        title: 'Pentingnya Bisnis Intelligence',
        no: 1,
        videoUrl: 'yk_p1bi6Oyw',
        duration: 45,
        moduleId: idModuleBIMS1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Konsep Dasar Bisnis Intelligence',
        no: 2,
        videoUrl: 'j7hZe2ZwWPo',
        duration: 50,
        moduleId: idModuleBIMS1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Pengantar Data Warehousing',
        no: 1,
        videoUrl: 'CjzwkDddlFM',
        duration: 23,
        moduleId: idModuleBIMS2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Proses ETL dalam Bisnis Intelligence',
        no: 2,
        videoUrl: 'vlaBGlCOSg0',
        duration: 100,
        moduleId: idModuleBIMS2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Strategi Visualisasi Data Efektif',
        no: 1,
        videoUrl: 'vlaBGlCOSg0',
        duration: 42,
        moduleId: idModuleBIMS3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Menerapkan Teknik Visualisasi Data Lanjutan',
        no: 2,
        videoUrl: 'BRarEh3NdSc',
        duration: 37,
        moduleId: idModuleBIMS3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      //------------//
      // create video for module bootcampt pengembangan ios development
      {
        title: 'Pentingnya Pengembangan Aplikasi iOS',
        no: 1,
        videoUrl: 'BRarEh3NdSc',
        duration: 40,
        moduleId: idModuleBIOS1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Proses Pengembangan Aplikasi iOS',
        no: 2,
        videoUrl: 'CjzwkDddlFM',
        duration: 70,
        moduleId: idModuleBIOS1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Memahami Syntax Swift',
        no: 1,
        videoUrl: 'vlaBGlCOSg0',
        duration: 45,
        moduleId: idModuleBIOS2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Struktur Kontrol dalam Swift',
        no: 2,
        videoUrl: 'HOPtedXdrCY',
        duration: 100,
        moduleId: idModuleBIOS2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Pengenalan UIKit',
        no: 1,
        videoUrl: 'CjzwkDddlFM',
        duration: 33,
        moduleId: idModuleBIOS3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Membuat Tampilan Interaktif dengan UIKit',
        no: 2,
        videoUrl: 'CQDcJ07sMNg',
        duration: 49,
        moduleId: idModuleBIOS3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      //------------//
      // create video for module devops essentials: kursus lengkap
      {
        title: 'Apa Itu DevOps?',
        no: 1,
        videoUrl: 'CQDcJ07sMNg',
        duration: 20,
        moduleId: idModuleDEVOPS1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Manfaat Implementasi DevOps',
        no: 2,
        videoUrl: 'vlaBGlCOSg0',
        duration: 25,
        moduleId: idModuleDEVOPS1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Prinsip Continuous Integration (CI)',
        no: 1,
        videoUrl: 'HOPtedXdrCY',
        duration: 68,
        moduleId: idModuleDEVOPS2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Prinsip Continuous Delivery (CD)',
        no: 2,
        videoUrl: 'SKoGGSF4fDc',
        duration: 90,
        moduleId: idModuleDEVOPS2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Pengenalan Alat DevOps',
        no: 1,
        videoUrl: 'Sl0YBFJuvSU',
        duration: 43,
        moduleId: idModuleDEVOPS3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Implementasi Jenkins dalam DevOps',
        no: 2,
        videoUrl: 'CjzwkDddlFM',
        duration: 62,
        moduleId: idModuleDEVOPS3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      //------------//
      // create video java programing dasar sampai lanjutan
      {
        title: 'Apa Itu Pemrograman Java?',
        no: 1,
        videoUrl: 'CjzwkDddlFM',
        duration: 55,
        moduleId: idModuleJAVA1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Instalasi dan Konfigurasi Java Development Kit (JDK)',
        no: 2,
        videoUrl: 'Sl0YBFJuvSU',
        duration: 30,
        moduleId: idModuleJAVA1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Struktur Dasar Program Java',
        no: 1,
        videoUrl: 'HOPtedXdrCY',
        duration: 28,
        moduleId: idModuleJAVA2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Variabel dan Tipe Data dalam Java',
        no: 2,
        videoUrl: 'SKoGGSF4fDc',
        duration: 100,
        moduleId: idModuleJAVA2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Konsep OOP (Object-Oriented Programming) dalam Java',
        no: 1,
        videoUrl: 'SKoGGSF4fDc',
        duration: 85,
        moduleId: idModuleJAVA3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Exception Handling dan File I/O di Java',
        no: 2,
        videoUrl: 'JVJc4k6xjTM',
        duration: 49,
        moduleId: idModuleJAVA3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      //------------//
      // create video React JS Mastery: Kursus Pengembangan Web Interaktif
      {
        title: 'Apa itu React JS dan Mengapa Penting?',
        no: 1,
        videoUrl: 'JVJc4k6xjTM',
        duration: 10,
        moduleId: idModuleREACTJS1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Cara Memulai Proyek React JS Pertama Anda',
        no: 2,
        videoUrl: 'https://youtu.be/CQDcJ07sMNg',
        duration: 68,
        moduleId: idModuleREACTJS1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Mengenal Konsep Komponen di React',
        no: 1,
        videoUrl: 'BRarEh3NdSc',
        duration: 20,
        moduleId: idModuleREACTJS2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Menggunakan Properti dalam Komponen React',
        no: 2,
        videoUrl: 'g0vyvImYaWE',
        duration: 13,
        moduleId: idModuleREACTJS2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Pengenalan Manajemen State',
        no: 1,
        videoUrl: '8YKbodsF7kQ',
        duration: 31,
        moduleId: idModuleREACTJS3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Menggunakan React Hooks untuk Manajemen State',
        no: 2,
        videoUrl: 'Cv6vvcAGuD0',
        duration: 32,
        moduleId: idModuleREACTJS3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Menggunakan React Router untuk Routing',
        no: 1,
        videoUrl: 't2s863UWF2I',
        duration: 11,
        moduleId: idModuleREACTJS4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Membuat Navigasi Berbasis Komponen',
        no: 2,
        videoUrl: 'SKoGGSF4fDc',
        duration: 30,
        moduleId: idModuleREACTJS4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Strategi Optimal untuk Menangani Navigasi di React',
        no: 3,
        videoUrl: 'zf9kXjW5DqQ',
        duration: 60,
        moduleId: idModuleREACTJS4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      //------------//
      // create video Node.js & Express.js: Kursus Pengembangan Backend
      {
        title: 'Pengenalan Node.js',
        no: 1,
        videoUrl: 'SKoGGSF4fDc',
        duration: 60,
        moduleId: idModuleNODE1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Memahami Konsep Node.js',
        no: 2,
        videoUrl: 't2s863UWF2I',
        duration: 75,
        moduleId: idModuleNODE2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'HTTP Server Node.js',
        no: 3,
        videoUrl: 'g0vyvImYaWE',
        duration: 90,
        moduleId: idModuleNODE3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      {
        title: 'Memahami Express.js: Dasar-dasar Routing',
        no: 1,
        videoUrl: 'JVJc4k6xjTM',
        duration: 50,
        moduleId: idModuleNODE2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Memahami Express.js: Penggunaan Middleware',
        no: 2,
        videoUrl: 'BruzjxVsneM',
        duration: 37,
        moduleId: idModuleNODE2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Memahami Express.js: Membangun Endpoint API',
        no: 3,
        videoUrl: 'iQwND8dlCdM',
        duration: 65,
        moduleId: idModuleNODE2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      {
        title: 'Routing pada Express.js',
        no: 1,
        videoUrl: 'HOPtedXdrCY',
        duration: 74,
        moduleId: idModuleNODE3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Middleware dalam Pengembangan Node.js',
        no: 2,
        videoUrl: 'BruzjxVsneM',
        duration: 30,
        moduleId: idModuleNODE3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Penerapan Routing dan Middleware',
        no: 3,
        videoUrl: 'CjzwkDddlFM',
        duration: 21,
        moduleId: idModuleNODE3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      {
        title: 'Pengenalan RESTful API',
        no: 1,
        videoUrl: 'SKoGGSF4fDc',
        duration: 20,
        moduleId: idModuleNODE4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Membuat Endpoint GET pada Express.js',
        no: 2,
        videoUrl: 'vlaBGlCOSg0',
        duration: 90,
        moduleId: idModuleNODE4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Menangani POST Request dan Validasi Data',
        no: 3,
        videoUrl: 'HOPtedXdrCY',
        duration: 15,
        moduleId: idModuleNODE4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      {
        title: 'Pengenalan Koneksi ke Database',
        no: 1,
        videoUrl: 'vlaBGlCOSg0',
        duration: 15,
        moduleId: idModuleNODE5,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Menggunakan MongoDB dengan Mongoose',
        no: 2,
        videoUrl: 'j7hZe2ZwWPo',
        duration: 28,
        moduleId: idModuleNODE5,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Mengintegrasikan Express.js dengan Database',
        no: 3,
        videoUrl: 'vlaBGlCOSg0',
        duration: 30,
        moduleId: idModuleNODE5,
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      {
        title: 'Pentingnya Keamanan Aplikasi Node.js',
        no: 1,
        videoUrl: 'vlaBGlCOSg0',
        duration: 30,
        moduleId: idModuleNODE6,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Strategi Pengamanan Data pada Express.js',
        no: 2,
        videoUrl: 'j7hZe2ZwWPo',
        duration: 13,
        moduleId: idModuleNODE6,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Menggunakan Helmet untuk Keamanan Express.js',
        no: 3,
        videoUrl: 'HOPtedXdrCY',
        duration: 24,
        moduleId: idModuleNODE6,
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      //------------//
      // create video UI/UX with Figma
      {
        title: 'Pengantar UI/UX Design',
        no: 1,
        videoUrl: 'CjzwkDddlFM',
        duration: 24,
        moduleId: idModuleFIGMA1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Peran Penting UI dalam Desain Produk',
        no: 2,
        videoUrl: 'HOPtedXdrCY',
        duration: 30,
        moduleId: idModuleFIGMA1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Konsep Dasar UX dan Figma',
        no: 3,
        videoUrl: 'Sl0YBFJuvSU',
        duration: 28,
        moduleId: idModuleFIGMA1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      {
        title: 'Perencanaan Ide Desain Produk',
        no: 1,
        videoUrl: 'vlaBGlCOSg0',
        duration: 35,
        moduleId: idModuleFIGMA2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Menggunakan Figma untuk Brainstorming',
        no: 2,
        videoUrl: 'HOPtedXdrCY',
        duration: 40,
        moduleId: idModuleFIGMA2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Strategi Penyusunan Ide yang Efektif',
        no: 3,
        videoUrl: 'CjzwkDddlFM',
        duration: 32,
        moduleId: idModuleFIGMA2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      {
        title: 'Prinsip Dasar Desain Antarmuka Pengguna',
        no: 1,
        videoUrl: 'HOPtedXdrCY',
        duration: 45,
        moduleId: idModuleFIGMA3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Menerapkan Desain Responsif dengan Figma',
        no: 2,
        videoUrl: 'vlaBGlCOSg0',
        duration: 50,
        moduleId: idModuleFIGMA3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Pemilihan Warna dan Tipografi dalam Desain UI',
        no: 3,
        videoUrl: 'j7hZe2ZwWPo',
        duration: 38,
        moduleId: idModuleFIGMA3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      {
        title: 'Memahami Prinsip-Prinsip Pengalaman Pengguna',
        no: 1,
        videoUrl: 'iQwND8dlCdM',
        duration: 40,
        moduleId: idModuleFIGMA4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'User Research: Meningkatkan Desain berdasarkan Pengguna',
        no: 2,
        videoUrl: 'SKoGGSF4fDc',
        duration: 55,
        moduleId: idModuleFIGMA4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Prototyping dan Pengujian Pengalaman Pengguna',
        no: 3,
        videoUrl: 'vlaBGlCOSg0',
        duration: 48,
        moduleId: idModuleFIGMA4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ])
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Courses', null, {})
    await queryInterface.bulkDelete('Modules', null, {})
    await queryInterface.bulkDelete('Videos', null, {})
  },
}

import 'dart:async';
import 'dart:math';
import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

void main() {
  WidgetsFlutterBinding.ensureInitialized();
  runApp(const LoveWebApp());
}

class LoveWebApp extends StatelessWidget {
  const LoveWebApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'For My Favorite Person ✨',
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        brightness: Brightness.dark,
        scaffoldBackgroundColor: const Color(0xFF09040E),
        colorScheme: const ColorScheme.dark(
          primary: Color(0xFFFF4D79),
          secondary: Color(0xFFFF758C),
          surface: Color(0xFF190C25),
        ),
        fontFamily: GoogleFonts.outfit().fontFamily,
      ),
      home: const MainLoveScreen(),
    );
  }
}

class MainLoveScreen extends StatefulWidget {
  const MainLoveScreen({super.key});

  @override
  State<MainLoveScreen> createState() => _MainLoveScreenState();
}

class _MainLoveScreenState extends State<MainLoveScreen>
    with SingleTickerProviderStateMixin {
  int _selectedTab = 0;

  // Personalized configuration
  String _herName = 'My Beautiful Girl';
  String _yourName = 'Your Favorite Person';
  DateTime _anniversaryDate = DateTime(2023, 10, 4);
  String _loveLetter =
      'I wanted to create something as radiant and special as you make me feel every single day.\n\n'
      'Thank you for being my favorite person, my safest haven, and my happiest smile. '
      'Every laugh we share and every quiet moment together is a treasure.\n\n'
      'I love you today, tomorrow, and for all our tomorrows to come. ❤️';

  final List<String> _reasons = [
    'The way your entire face lights up whenever you laugh from your soul.',
    'How safe and warm the world feels whenever I hold your hand.',
    'Your adorable sleepy voice when you first wake up.',
    'How you remember the little details about me that everyone else misses.',
    'Your boundless kindness and empathy toward everyone around you.',
    'The way you look at me across a crowded room like only we exist.',
    'Your goofy dance moves whenever your favorite food arrives.',
    'How you inspire me to be the best version of myself.',
    'That no matter how many times I see you, my heart still skips a beat.',
  ];

  int _currentReasonIndex = 0;
  final Set<int> _redeemedCoupons = {};

  late Timer _tickerTimer;
  Duration _timeElapsed = Duration.zero;

  @override
  void initState() {
    super.initState();
    _calculateTimeElapsed();
    _tickerTimer = Timer.periodic(const Duration(seconds: 1), (_) {
      _calculateTimeElapsed();
    });
  }

  void _calculateTimeElapsed() {
    final now = DateTime.now();
    setState(() {
      _timeElapsed = now.isAfter(_anniversaryDate)
          ? now.difference(_anniversaryDate)
          : Duration.zero;
    });
  }

  @override
  void dispose() {
    _tickerTimer.cancel();
    super.dispose();
  }

  void _openSettingsDialog() {
    final herController = TextEditingController(text: _herName);
    final yourController = TextEditingController(text: _yourName);
    final letterController = TextEditingController(text: _loveLetter);

    showDialog(
      context: context,
      builder: (ctx) => AlertDialog(
        backgroundColor: const Color(0xFF1B0B2A),
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(20),
          side: const BorderSide(color: Color(0xFFFF758C), width: 1.2),
        ),
        title: Row(
          children: [
            const Text('⚙️ ', style: TextStyle(fontSize: 20)),
            Text(
              'Personalize App',
              style: GoogleFonts.cinzel(
                fontWeight: FontWeight.bold,
                color: Colors.white,
              ),
            ),
          ],
        ),
        content: SingleChildScrollView(
          child: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              TextField(
                controller: herController,
                decoration: const InputDecoration(
                  labelText: "Her Name / Nickname",
                  labelStyle: TextStyle(color: Color(0xFFFFB3C1)),
                  focusedBorder: UnderlineInputBorder(
                    borderSide: BorderSide(color: Color(0xFFFF4D79)),
                  ),
                ),
              ),
              const SizedBox(height: 12),
              TextField(
                controller: yourController,
                decoration: const InputDecoration(
                  labelText: "Your Name / Sign-off",
                  labelStyle: TextStyle(color: Color(0xFFFFB3C1)),
                  focusedBorder: UnderlineInputBorder(
                    borderSide: BorderSide(color: Color(0xFFFF4D79)),
                  ),
                ),
              ),
              const SizedBox(height: 12),
              StatefulBuilder(
                builder: (context, setPickerState) {
                  return ListTile(
                    contentPadding: EdgeInsets.zero,
                    title: const Text(
                      'Anniversary Date',
                      style: TextStyle(color: Color(0xFFFFB3C1), fontSize: 13),
                    ),
                    subtitle: Text(
                      '${_anniversaryDate.year}-${_anniversaryDate.month.toString().padLeft(2, '0')}-${_anniversaryDate.day.toString().padLeft(2, '0')}',
                      style: const TextStyle(color: Colors.white, fontSize: 15),
                    ),
                    trailing: TextButton.icon(
                      icon: const Icon(Icons.calendar_today, size: 16, color: Color(0xFFFF4D79)),
                      label: const Text('Change', style: TextStyle(color: Color(0xFFFF4D79))),
                      onPressed: () async {
                        final picked = await showDatePicker(
                          context: context,
                          initialDate: _anniversaryDate,
                          firstDate: DateTime(2000),
                          lastDate: DateTime.now(),
                        );
                        if (picked != null) {
                          setPickerState(() {
                            _anniversaryDate = picked;
                          });
                        }
                      },
                    ),
                  );
                },
              ),
              const SizedBox(height: 12),
              TextField(
                controller: letterController,
                maxLines: 4,
                decoration: const InputDecoration(
                  labelText: "Love Letter Message",
                  labelStyle: TextStyle(color: Color(0xFFFFB3C1)),
                  focusedBorder: UnderlineInputBorder(
                    borderSide: BorderSide(color: Color(0xFFFF4D79)),
                  ),
                ),
              ),
            ],
          ),
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(ctx),
            child: const Text('Cancel', style: TextStyle(color: Colors.white60)),
          ),
          ElevatedButton(
            style: ElevatedButton.styleFrom(
              backgroundColor: const Color(0xFFFF4D79),
              shape: RoundedRectangleBorder(
                borderRadius: BorderRadius.circular(12),
              ),
            ),
            onPressed: () {
              setState(() {
                if (herController.text.trim().isNotEmpty) {
                  _herName = herController.text.trim();
                }
                if (yourController.text.trim().isNotEmpty) {
                  _yourName = yourController.text.trim();
                }
                if (letterController.text.trim().isNotEmpty) {
                  _loveLetter = letterController.text.trim();
                }
                _calculateTimeElapsed();
              });
              Navigator.pop(ctx);
            },
            child: const Text('Save 💖', style: TextStyle(color: Colors.white)),
          ),
        ],
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      extendBodyBehindAppBar: true,
      appBar: AppBar(
        backgroundColor: Colors.black.withAlpha(80),
        elevation: 0,
        centerTitle: false,
        title: Row(
          children: [
            const Text('💖 ', style: TextStyle(fontSize: 20)),
            Text(
              '$_herName & $_yourName',
              style: GoogleFonts.cinzel(
                fontSize: 16,
                fontWeight: FontWeight.bold,
                color: Colors.white,
              ),
            ),
          ],
        ),
        actions: [
          IconButton(
            icon: const Icon(Icons.settings, color: Color(0xFFFFB3C1)),
            tooltip: 'Personalize',
            onPressed: _openSettingsDialog,
          ),
        ],
      ),
      body: Stack(
        children: [
          // Animated Cosmic Background Painter
          const Positioned.fill(
            child: CosmicBackground(),
          ),
          // Tab Content
          SafeArea(
            child: IndexedStack(
              index: _selectedTab,
              children: [
                _buildHomeTab(),
                _buildStoryTab(),
                _buildLetterTab(),
                _buildReasonsTab(),
                _buildCouponsTab(),
              ],
            ),
          ),
        ],
      ),
      bottomNavigationBar: Container(
        decoration: BoxDecoration(
          color: const Color(0xFF140820).withAlpha(220),
          border: const Border(
            top: BorderSide(color: Color(0x33FF758C)),
          ),
        ),
        child: BottomNavigationBar(
          currentIndex: _selectedTab,
          onTap: (index) => setState(() => _selectedTab = index),
          backgroundColor: Colors.transparent,
          elevation: 0,
          selectedItemColor: const Color(0xFFFF4D79),
          unselectedItemColor: Colors.white54,
          type: BottomNavigationBarType.fixed,
          items: const [
            BottomNavigationBarItem(icon: Icon(Icons.favorite), label: 'Home'),
            BottomNavigationBarItem(icon: Icon(Icons.auto_stories), label: 'Story'),
            BottomNavigationBarItem(icon: Icon(Icons.mark_email_read), label: 'Letter'),
            BottomNavigationBarItem(icon: Icon(Icons.lightbulb), label: 'Reasons'),
            BottomNavigationBarItem(icon: Icon(Icons.confirmation_number), label: 'Coupons'),
          ],
        ),
      ),
    );
  }

  // =========================================================================
  // TAB 1: HOME & LIVE TIME COUNTER
  // =========================================================================
  Widget _buildHomeTab() {
    final days = _timeElapsed.inDays;
    final hours = _timeElapsed.inHours % 24;
    final minutes = _timeElapsed.inMinutes % 60;
    final seconds = _timeElapsed.inSeconds % 60;

    return SingleChildScrollView(
      physics: const BouncingScrollPhysics(),
      padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 16),
      child: Center(
        child: ConstrainedBox(
          constraints: const BoxConstraints(maxWidth: 600),
          child: Column(
            children: [
              const SizedBox(height: 20),
              Container(
                padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
                decoration: BoxDecoration(
                  color: const Color(0x22FF4D79),
                  border: Border.all(color: const Color(0x55FF4D79)),
                  borderRadius: BorderRadius.circular(20),
                ),
                child: Row(
                  mainAxisSize: MainAxisSize.min,
                  children: [
                    const Text('✨ ', style: TextStyle(fontSize: 14)),
                    Text(
                      'Dedicated to the love of my life',
                      style: GoogleFonts.outfit(
                        color: const Color(0xFFFFB3C1),
                        fontSize: 13,
                        fontWeight: FontWeight.w500,
                      ),
                    ),
                  ],
                ),
              ),
              const SizedBox(height: 18),
              Text(
                'For My Dearest,\n$_herName',
                textAlign: TextAlign.center,
                style: GoogleFonts.cinzel(
                  fontSize: 28,
                  fontWeight: FontWeight.bold,
                  color: Colors.white,
                  shadows: [
                    const Shadow(
                      color: Color(0x99FF4D79),
                      blurRadius: 18,
                    )
                  ],
                ),
              ),
              const SizedBox(height: 12),
              Text(
                '"In a sky full of billions of stars, my heart will always look for you."',
                textAlign: TextAlign.center,
                style: GoogleFonts.playfairDisplay(
                  fontSize: 15,
                  fontStyle: FontStyle.italic,
                  color: const Color(0xFFFFF1E6),
                ),
              ),
              const SizedBox(height: 30),

              // Live Counter Glass Card
              Container(
                width: double.infinity,
                padding: const EdgeInsets.all(24),
                decoration: BoxDecoration(
                  color: const Color(0xFF1A0A26).withAlpha(180),
                  border: Border.all(color: const Color(0x44FF758C)),
                  borderRadius: BorderRadius.circular(24),
                  boxShadow: const [
                    BoxShadow(
                      color: Color(0x33FF4D79),
                      blurRadius: 25,
                      offset: Offset(0, 8),
                    )
                  ],
                ),
                child: Column(
                  children: [
                    Row(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        const Text('⏳ ', style: TextStyle(fontSize: 16)),
                        Text(
                          'FALLING IN LOVE EVERY SECOND',
                          style: GoogleFonts.outfit(
                            fontSize: 12,
                            letterSpacing: 1.5,
                            fontWeight: FontWeight.bold,
                            color: const Color(0xFFFF758C),
                          ),
                        ),
                      ],
                    ),
                    const SizedBox(height: 20),
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                      children: [
                        _buildTimeUnit(days.toString(), 'DAYS'),
                        _buildTimeSeparator(),
                        _buildTimeUnit(hours.toString().padLeft(2, '0'), 'HOURS'),
                        _buildTimeSeparator(),
                        _buildTimeUnit(minutes.toString().padLeft(2, '0'), 'MINUTES'),
                        _buildTimeSeparator(),
                        _buildTimeUnit(seconds.toString().padLeft(2, '0'), 'SECONDS'),
                      ],
                    ),
                    const SizedBox(height: 16),
                    Text(
                      'Together since October 4, 2023 • Always & Forever',
                      style: GoogleFonts.outfit(
                        fontSize: 12,
                        color: Colors.white60,
                      ),
                    ),
                  ],
                ),
              ),

              const SizedBox(height: 30),

              // Quick Action Tiles
              Row(
                children: [
                  Expanded(
                    child: _buildActionTile(
                      icon: '💌',
                      title: 'Love Letter',
                      subtitle: 'Read secret note',
                      onTap: () => setState(() => _selectedTab = 2),
                    ),
                  ),
                  const SizedBox(width: 14),
                  Expanded(
                    child: _buildActionTile(
                      icon: '🎟️',
                      title: 'Coupons',
                      subtitle: 'Redeem passes',
                      onTap: () => setState(() => _selectedTab = 4),
                    ),
                  ),
                ],
              ),
              const SizedBox(height: 30),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildTimeUnit(String value, String label) {
    return Column(
      children: [
        Text(
          value,
          style: GoogleFonts.outfit(
            fontSize: 26,
            fontWeight: FontWeight.bold,
            color: Colors.white,
            shadows: [
              const Shadow(
                color: Color(0x88FF4D79),
                blurRadius: 10,
              )
            ],
          ),
        ),
        const SizedBox(height: 4),
        Text(
          label,
          style: GoogleFonts.outfit(
            fontSize: 9,
            fontWeight: FontWeight.w600,
            letterSpacing: 1,
            color: const Color(0xFFFFB3C1),
          ),
        ),
      ],
    );
  }

  Widget _buildTimeSeparator() {
    return Text(
      ':',
      style: GoogleFonts.outfit(
        fontSize: 22,
        fontWeight: FontWeight.bold,
        color: const Color(0xFFFF758C),
      ),
    );
  }

  Widget _buildActionTile({
    required String icon,
    required String title,
    required String subtitle,
    required VoidCallback onTap,
  }) {
    return InkWell(
      onTap: onTap,
      borderRadius: BorderRadius.circular(18),
      child: Container(
        padding: const EdgeInsets.all(18),
        decoration: BoxDecoration(
          color: const Color(0xFF1E0D30).withAlpha(160),
          border: Border.all(color: const Color(0x33FF758C)),
          borderRadius: BorderRadius.circular(18),
        ),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(icon, style: const TextStyle(fontSize: 26)),
            const SizedBox(height: 10),
            Text(
              title,
              style: GoogleFonts.cinzel(
                fontSize: 15,
                fontWeight: FontWeight.bold,
                color: Colors.white,
              ),
            ),
            const SizedBox(height: 4),
            Text(
              subtitle,
              style: GoogleFonts.outfit(
                fontSize: 12,
                color: Colors.white60,
              ),
            ),
          ],
        ),
      ),
    );
  }

  // =========================================================================
  // TAB 2: OUR STORY MILESTONES
  // =========================================================================
  Widget _buildStoryTab() {
    final milestones = [
      {
        'chapter': 'Chapter 1',
        'title': 'The Day We Met',
        'text': 'Out of 8 billion people, the universe brought you into my life. The start of my happiest story.',
        'icon': '✨'
      },
      {
        'chapter': 'Chapter 2',
        'title': 'Our First Date',
        'text': 'Nervous laughs, endless eye contact, and losing track of time together.',
        'icon': '☕'
      },
      {
        'chapter': 'Chapter 3',
        'title': 'The Moment I Knew',
        'text': 'Seeing your gentle kindness and how safe it felt being with you. Home became a person.',
        'icon': '💖'
      },
      {
        'chapter': 'Chapter 4',
        'title': 'Midnight Talks & Laughter',
        'text': 'Talking about our wildest dreams and laughing until our stomachs hurt under the moonlight.',
        'icon': '🌙'
      },
      {
        'chapter': 'Chapter 5',
        'title': 'To Forever & Beyond',
        'text': 'All the road trips, cozy mornings, and unwritten memories waiting for us.',
        'icon': '🚀'
      },
    ];

    return ListView.builder(
      physics: const BouncingScrollPhysics(),
      padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 20),
      itemCount: milestones.length,
      itemBuilder: (ctx, i) {
        final m = milestones[i];
        return Container(
          margin: const EdgeInsets.only(bottom: 20),
          padding: const EdgeInsets.all(20),
          decoration: BoxDecoration(
            color: const Color(0xFF1B0B2A).withAlpha(190),
            border: Border.all(color: const Color(0x44FF758C)),
            borderRadius: BorderRadius.circular(20),
          ),
          child: Row(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Container(
                width: 44,
                height: 44,
                decoration: BoxDecoration(
                  gradient: const LinearGradient(
                    colors: [Color(0xFFFF4D79), Color(0xFFB81D4A)],
                  ),
                  borderRadius: BorderRadius.circular(22),
                  boxShadow: const [
                    BoxShadow(
                      color: Color(0x66FF4D79),
                      blurRadius: 10,
                    )
                  ],
                ),
                alignment: Alignment.center,
                child: Text(m['icon']!, style: const TextStyle(fontSize: 20)),
              ),
              const SizedBox(width: 16),
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      m['chapter']!.toUpperCase(),
                      style: GoogleFonts.outfit(
                        fontSize: 11,
                        fontWeight: FontWeight.bold,
                        color: const Color(0xFFFCD34D),
                        letterSpacing: 1,
                      ),
                    ),
                    const SizedBox(height: 4),
                    Text(
                      m['title']!,
                      style: GoogleFonts.cinzel(
                        fontSize: 16,
                        fontWeight: FontWeight.bold,
                        color: Colors.white,
                      ),
                    ),
                    const SizedBox(height: 8),
                    Text(
                      m['text']!,
                      style: GoogleFonts.outfit(
                        fontSize: 13,
                        color: Colors.white70,
                        height: 1.5,
                      ),
                    ),
                  ],
                ),
              ),
            ],
          ),
        );
      },
    );
  }

  // =========================================================================
  // TAB 3: LOVE LETTER
  // =========================================================================
  Widget _buildLetterTab() {
    return Center(
      child: SingleChildScrollView(
        physics: const BouncingScrollPhysics(),
        padding: const EdgeInsets.all(20),
        child: Container(
          constraints: const BoxConstraints(maxWidth: 520),
          padding: const EdgeInsets.all(28),
          decoration: BoxDecoration(
            color: const Color(0xFFFFF9F2),
            borderRadius: BorderRadius.circular(20),
            boxShadow: const [
              BoxShadow(
                color: Color(0x55000000),
                blurRadius: 25,
                offset: Offset(0, 10),
              ),
              BoxShadow(
                color: Color(0x33FF4D79),
                blurRadius: 30,
              )
            ],
          ),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Container(
                padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                decoration: BoxDecoration(
                  border: Border.all(color: const Color(0xFFA83232), width: 1.2),
                  borderRadius: BorderRadius.circular(6),
                ),
                child: Text(
                  '❤️ OFFICIAL LOVE NOTE',
                  style: GoogleFonts.cinzel(
                    fontSize: 10,
                    fontWeight: FontWeight.bold,
                    color: const Color(0xFFA83232),
                  ),
                ),
              ),
              const SizedBox(height: 20),
              Text(
                'Dearest $_herName,',
                style: GoogleFonts.playfairDisplay(
                  fontSize: 22,
                  fontWeight: FontWeight.bold,
                  color: const Color(0xFF2B1220),
                ),
              ),
              const SizedBox(height: 16),
              Text(
                _loveLetter,
                style: GoogleFonts.dancingScript(
                  fontSize: 20,
                  color: const Color(0xFF381E10),
                  height: 1.6,
                  fontWeight: FontWeight.w600,
                ),
              ),
              const SizedBox(height: 24),
              const Divider(color: Color(0x33A83232)),
              const SizedBox(height: 8),
              Align(
                alignment: Alignment.centerRight,
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.end,
                  children: [
                    Text(
                      'Forever & always yours,',
                      style: GoogleFonts.dancingScript(
                        fontSize: 18,
                        color: const Color(0xFF4A2A1A),
                      ),
                    ),
                    Text(
                      '$_yourName ❤️',
                      style: GoogleFonts.dancingScript(
                        fontSize: 22,
                        fontWeight: FontWeight.bold,
                        color: const Color(0xFF991B1B),
                      ),
                    ),
                  ],
                ),
              )
            ],
          ),
        ),
      ),
    );
  }

  // =========================================================================
  // TAB 4: REASONS DECK
  // =========================================================================
  Widget _buildReasonsTab() {
    final reason = _reasons[_currentReasonIndex % _reasons.length];

    return Center(
      child: Padding(
        padding: const EdgeInsets.all(24),
        child: ConstrainedBox(
          constraints: const BoxConstraints(maxWidth: 460),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Container(
                width: double.infinity,
                padding: const EdgeInsets.symmetric(horizontal: 28, vertical: 36),
                decoration: BoxDecoration(
                  gradient: const RadialGradient(
                    colors: [Color(0xFF2A0E30), Color(0xFF14061A)],
                    radius: 1.2,
                  ),
                  border: Border.all(color: const Color(0x55FF758C)),
                  borderRadius: BorderRadius.circular(24),
                  boxShadow: const [
                    BoxShadow(
                      color: Color(0x44FF4D79),
                      blurRadius: 30,
                      offset: Offset(0, 8),
                    )
                  ],
                ),
                child: Column(
                  children: [
                    Container(
                      padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 4),
                      decoration: BoxDecoration(
                        color: const Color(0x22FF4D79),
                        borderRadius: BorderRadius.circular(20),
                      ),
                      child: Text(
                        'REASON #${_currentReasonIndex + 1} OF ${_reasons.length}',
                        style: GoogleFonts.outfit(
                          fontSize: 11,
                          fontWeight: FontWeight.bold,
                          color: const Color(0xFFFF758C),
                        ),
                      ),
                    ),
                    const SizedBox(height: 24),
                    const Text('💖', style: TextStyle(fontSize: 40)),
                    const SizedBox(height: 20),
                    Text(
                      '"$reason"',
                      textAlign: TextAlign.center,
                      style: GoogleFonts.playfairDisplay(
                        fontSize: 18,
                        color: Colors.white,
                        height: 1.5,
                      ),
                    ),
                  ],
                ),
              ),
              const SizedBox(height: 30),
              ElevatedButton.icon(
                style: ElevatedButton.styleFrom(
                  backgroundColor: const Color(0xFFFF4D79),
                  padding: const EdgeInsets.symmetric(horizontal: 28, vertical: 16),
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(30),
                  ),
                  elevation: 8,
                ),
                onPressed: () {
                  setState(() {
                    _currentReasonIndex =
                        (_currentReasonIndex + 1) % _reasons.length;
                  });
                },
                icon: const Icon(Icons.auto_awesome, color: Colors.white),
                label: Text(
                  'Draw Another Reason ✨',
                  style: GoogleFonts.outfit(
                    fontSize: 15,
                    fontWeight: FontWeight.bold,
                    color: Colors.white,
                  ),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }

  // =========================================================================
  // TAB 5: ROMANTIC LOVE COUPONS
  // =========================================================================
  Widget _buildCouponsTab() {
    final coupons = [
      {'id': 1, 'icon': '🍦', 'title': 'Late Night Ice Cream & Drive', 'desc': 'Valid anytime. Your favorite flavor with music and night breeze.'},
      {'id': 2, 'icon': '💆‍♀️', 'title': 'Relaxing Massage & Cuddles', 'desc': '30 minutes of head or back massage. Zero complaints allowed.'},
      {'id': 3, 'icon': '🎬', 'title': 'Movie Night Veto Power', 'desc': 'You pick whatever we watch. I bring snacks and zero phone usage.'},
      {'id': 4, 'icon': '🍝', 'title': 'Candlelight Dinner Cooked by Me', 'desc': 'A delicious homemade meal with clean dishes taken care of.'},
      {'id': 5, 'icon': '👑', 'title': 'Queen For A Day Pass', 'desc': 'Zero chores and you call all the decisions for 24 hours.'},
      {'id': 6, 'icon': '🏆', 'title': 'Instant Win in Any Argument', 'desc': 'Pull this card and I instantly admit that you are 100% right.'},
    ];

    return ListView.builder(
      physics: const BouncingScrollPhysics(),
      padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 16),
      itemCount: coupons.length,
      itemBuilder: (ctx, i) {
        final c = coupons[i];
        final id = c['id'] as int;
        final isRedeemed = _redeemedCoupons.contains(id);

        return Container(
          margin: const EdgeInsets.only(bottom: 16),
          padding: const EdgeInsets.all(20),
          decoration: BoxDecoration(
            color: const Color(0xFF190C25).withAlpha(190),
            border: Border.all(
              color: isRedeemed
                  ? Colors.white24
                  : const Color(0x55FF758C),
              style: BorderStyle.solid,
            ),
            borderRadius: BorderRadius.circular(20),
          ),
          child: Row(
            children: [
              Text(c['icon'] as String, style: const TextStyle(fontSize: 32)),
              const SizedBox(width: 16),
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      c['title'] as String,
                      style: GoogleFonts.cinzel(
                        fontSize: 15,
                        fontWeight: FontWeight.bold,
                        color: Colors.white,
                      ),
                    ),
                    const SizedBox(height: 6),
                    Text(
                      c['desc'] as String,
                      style: GoogleFonts.outfit(
                        fontSize: 12,
                        color: Colors.white70,
                      ),
                    ),
                  ],
                ),
              ),
              const SizedBox(width: 12),
              ElevatedButton(
                style: ElevatedButton.styleFrom(
                  backgroundColor: isRedeemed
                      ? Colors.white12
                      : const Color(0xFFFF4D79),
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(20),
                  ),
                ),
                onPressed: isRedeemed
                    ? null
                    : () {
                        setState(() {
                          _redeemedCoupons.add(id);
                        });
                        ScaffoldMessenger.of(context).showSnackBar(
                          SnackBar(
                            backgroundColor: const Color(0xFFB81D4A),
                            content: Text(
                              'Coupon redeemed with love! 💖',
                              style: GoogleFonts.outfit(),
                            ),
                          ),
                        );
                      },
                child: Text(
                  isRedeemed ? 'Redeemed' : 'Redeem',
                  style: GoogleFonts.outfit(
                    fontSize: 12,
                    fontWeight: FontWeight.bold,
                    color: Colors.white,
                  ),
                ),
              ),
            ],
          ),
        );
      },
    );
  }
}

// ===========================================================================
// COSMIC BACKGROUND WITH TWINKLING PARTICLES
// ===========================================================================
class CosmicBackground extends StatefulWidget {
  const CosmicBackground({super.key});

  @override
  State<CosmicBackground> createState() => _CosmicBackgroundState();
}

class _CosmicBackgroundState extends State<CosmicBackground>
    with SingleTickerProviderStateMixin {
  late AnimationController _animController;
  final List<StarPoint> _stars = [];
  final Random _rng = Random();

  @override
  void initState() {
    super.initState();
    for (int i = 0; i < 60; i++) {
      _stars.add(StarPoint(
        x: _rng.nextDouble(),
        y: _rng.nextDouble(),
        size: _rng.nextDouble() * 2.2 + 0.8,
        speed: _rng.nextDouble() * 0.02 + 0.005,
      ));
    }
    _animController = AnimationController(
      vsync: this,
      duration: const Duration(seconds: 4),
    )..repeat();
  }

  @override
  void dispose() {
    _animController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return AnimatedBuilder(
      animation: _animController,
      builder: (ctx, child) {
        return CustomPaint(
          painter: CosmicPainter(
            stars: _stars,
            progress: _animController.value,
          ),
        );
      },
    );
  }
}

class StarPoint {
  final double x;
  final double y;
  final double size;
  final double speed;
  StarPoint({required this.x, required this.y, required this.size, required this.speed});
}

class CosmicPainter extends CustomPainter {
  final List<StarPoint> stars;
  final double progress;

  CosmicPainter({required this.stars, required this.progress});

  @override
  void paint(Canvas canvas, Size size) {
    final bgPaint = Paint()
      ..shader = const RadialGradient(
        center: Alignment(0, -0.6),
        radius: 1.4,
        colors: [
          Color(0xFF1E0C2C),
          Color(0xFF0F0517),
          Color(0xFF07020B),
        ],
      ).createShader(Rect.fromLTWH(0, 0, size.width, size.height));

    canvas.drawRect(Rect.fromLTWH(0, 0, size.width, size.height), bgPaint);

    final starPaint = Paint()..color = const Color(0xFFFFB3C1);

    for (final s in stars) {
      final alpha = (sin((progress + s.speed) * pi * 2) * 0.4 + 0.6).clamp(0.1, 1.0);
      starPaint.color = const Color(0xFFFFB3C1).withAlpha((alpha * 255).toInt());
      canvas.drawCircle(
        Offset(s.x * size.width, s.y * size.height),
        s.size,
        starPaint,
      );
    }
  }

  @override
  bool shouldRepaint(covariant CosmicPainter oldDelegate) => true;
}

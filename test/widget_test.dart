import 'package:flutter_test/flutter_test.dart';
import 'package:love_web/main.dart';

void main() {
  testWidgets('LoveWebApp renders without crash', (WidgetTester tester) async {
    await tester.pumpWidget(const LoveWebApp());
    expect(find.byType(LoveWebApp), findsOneWidget);
  });
}

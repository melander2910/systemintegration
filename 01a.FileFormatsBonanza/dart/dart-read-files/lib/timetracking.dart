// ignore_for_file: public_member_api_docs, sort_constructors_first
import 'dart:convert';

import 'package:yaml/yaml.dart';

class TimeTracking {
  final int? id;
  final DateTime? startDate;
  final DateTime? endDate;
  final String? title;
  final String? description;
  final int? userId;
  final int? clientId;

  TimeTracking({
    this.id,
    this.startDate,
    this.endDate,
    this.title,
    this.description,
    this.userId,
    this.clientId,
  });

  Duration get duration {
    if (startDate == null || endDate == null) {
      return Duration.zero;
    }
    return endDate!.difference(startDate!);
  }

  factory TimeTracking.fromYaml(YamlMap map){
  final id = map['id'] as int;
  final startDate = map['startDate'] as String;
  final endDate = map['endDate'] as String;
  final title = map['title'] as String;
  final description = map['description'] as String;
  final clientId = map['clientId'] as int;
  final userId = map['userId'] as int;
  return TimeTracking(id: id, startDate: DateTime.parse(startDate), endDate: DateTime.parse(endDate), title: title, description: description, clientId: clientId, userId: userId);
}

  Map<String, dynamic> toMap() {
    return <String, dynamic>{
      'id': id,
      'startDate': startDate?.millisecondsSinceEpoch,
      'endDate': endDate?.millisecondsSinceEpoch,
      'title': title,
      'description': description,
      'userId': userId,
      'clientId': clientId,
    };
  }

  factory TimeTracking.fromMap(Map<String, dynamic> map) {
    return TimeTracking(
      id: map['id'] != null ? map['id'] as int : null,
      startDate: map['startDate'] != null ? DateTime.parse(map['startDate']) : null,
      endDate: map['endDate'] != null ? DateTime.parse(map['endDate']) : null,
      title: map['title'] != null ? map['title'] as String : null,
      description: map['description'] != null ? map['description'] as String : null,
      userId: map['userId'] != null ? map['userId'] as int : null,
      clientId: map['clientId'] != null ? map['clientId'] as int : null,
    );
  }

  String toJson() => json.encode(toMap());

  factory TimeTracking.fromJson(String source) => TimeTracking.fromMap(json.decode(source) as Map<String, dynamic>);

  @override
  String toString() {
    return 'TimeTracking(id: $id, startDate: $startDate, endDate: $endDate, title: $title, description: $description, userId: $userId, clientId: $clientId)';
  }
}

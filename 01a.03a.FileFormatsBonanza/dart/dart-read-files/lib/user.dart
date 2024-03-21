// ignore_for_file: public_member_api_docs, sort_constructors_first
import 'dart:convert';

import 'package:collection/collection.dart';
import 'package:dart_read_files/client.dart';
import 'package:dart_read_files/timetracking.dart';

class User {
  final int? id;
  final String? firstname;
  final String? lastname;
  final String? email;
  final List<Client>? clients;
  final List<TimeTracking>? timeTrackings;

  User({
    this.id,
    this.firstname,
    this.lastname,
    this.email,
    this.clients,
    this.timeTrackings,
  });


  Map<String, dynamic> toMap() {
    return <String, dynamic>{
      'id': id,
      'firstname': firstname,
      'lastname': lastname,
      'email': email,
      'clients': clients?.map((x) => x?.toMap()).toList(),
      'timeTrackings': timeTrackings?.map((x) => x?.toMap()).toList(),
    };
  }

  factory User.fromMap(Map<String, dynamic> map) {
    return User(
      id: map['id'] != null ? map['id'] as int : null,
      firstname: map['firstname'] != null ? map['firstname'] as String : null,
      lastname: map['lastname'] != null ? map['lastname'] as String : null,
      email: map['email'] != null ? map['email'] as String : null,
      clients: map['clients'] != null ? List<Client>.from((map['clients']).map<Client?>((x) => Client.fromMap(x as Map<String,dynamic>),),) : null,
      timeTrackings: map['timeTrackings'] != null ? List<TimeTracking>.from((map['timeTrackings']).map<TimeTracking?>((x) => TimeTracking.fromMap(x as Map<String,dynamic>),),) : null,
    );
  }

  String toJson() => json.encode(toMap());

  factory User.fromJson(String source) => User.fromMap(json.decode(source) as Map<String, dynamic>);

  @override
  String toString() {
    return 'User(id: $id, firstname: $firstname, lastname: $lastname, email: $email, clients: $clients, timeTrackings: $timeTrackings)';
  }

  @override
  bool operator ==(covariant User other) {
    if (identical(this, other)) return true;
    final listEquals = const DeepCollectionEquality().equals;
  
    return 
      other.id == id &&
      other.firstname == firstname &&
      other.lastname == lastname &&
      other.email == email &&
      listEquals(other.clients, clients) &&
      listEquals(other.timeTrackings, timeTrackings);
  }

  @override
  int get hashCode {
    return id.hashCode ^
      firstname.hashCode ^
      lastname.hashCode ^
      email.hashCode ^
      clients.hashCode ^
      timeTrackings.hashCode;
  }

}
